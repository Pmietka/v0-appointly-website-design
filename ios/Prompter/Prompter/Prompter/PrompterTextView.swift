import SwiftUI
import UIKit

/// Where the column of text sits inside the band. Sideways, it hugs the side
/// the camera is on so the eyes stay close to the lens.
enum PrompterColumn: Equatable {
    case center
    case leading
    case trailing
}

/// Shared between the SwiftUI controls and the UIKit scroller.
final class PrompterEngine: ObservableObject {
    static let lineHeightMultiple: CGFloat = 1.35

    @Published var isRunning = false
    @Published var reachedEnd = false
    var speed: Double = 4
    fileprivate var resetRequested = false

    /// Speed is in eighths of a line per second, so it feels the same at any text size.
    static func pointsPerSecond(speed: Double, fontSize: CGFloat) -> CGFloat {
        CGFloat(speed) * 0.125 * fontSize * lineHeightMultiple
    }

    func toggle() {
        if isRunning {
            isRunning = false
            return
        }
        if reachedEnd {
            resetRequested = true
            reachedEnd = false
        }
        isRunning = true
    }

    func restart() {
        resetRequested = true
        reachedEnd = false
    }
}

struct PrompterTextView: UIViewRepresentable {
    let text: String
    let fontSize: CGFloat
    let mirrored: Bool
    let column: PrompterColumn
    let engine: PrompterEngine

    func makeUIView(context: Context) -> PrompterScrollHost {
        PrompterScrollHost(engine: engine)
    }

    func updateUIView(_ view: PrompterScrollHost, context: Context) {
        view.configure(text: text, fontSize: fontSize, mirrored: mirrored, column: column)
    }
}

final class PrompterScrollHost: UIView, UIScrollViewDelegate {
    private let scrollView = UIScrollView()
    private let label = UILabel()
    private let fade = CAGradientLayer()
    private let engine: PrompterEngine
    private var displayLink: CADisplayLink?
    private var lastTimestamp: CFTimeInterval = 0

    private var text = ""
    private var fontSize: CGFloat = 40
    private var column: PrompterColumn = .center
    /// The scroll position, kept as a float so slow speeds stay smooth.
    private var position: CGFloat = 0

    /// About 15 to 18 characters wide per em: short lines keep the eyes still on camera.
    private var maxColumnEms: CGFloat { column == .center ? 18 : 15 }

    init(engine: PrompterEngine) {
        self.engine = engine
        super.init(frame: .zero)
        backgroundColor = .clear
        clipsToBounds = true

        scrollView.backgroundColor = .clear
        scrollView.showsVerticalScrollIndicator = false
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.alwaysBounceVertical = true
        scrollView.contentInsetAdjustmentBehavior = .never
        scrollView.delegate = self
        addSubview(scrollView)

        label.numberOfLines = 0
        label.isAccessibilityElement = true
        scrollView.addSubview(label)

        let tap = UITapGestureRecognizer(target: self, action: #selector(tapped))
        scrollView.addGestureRecognizer(tap)

        fade.colors = [UIColor.clear.cgColor, UIColor.black.cgColor, UIColor.black.cgColor, UIColor.clear.cgColor]
        layer.mask = fade
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) { fatalError("init(coder:) is not used") }

    func configure(text: String, fontSize: CGFloat, mirrored: Bool, column: PrompterColumn) {
        let changed = text != self.text || fontSize != self.fontSize || column != self.column || label.attributedText == nil
        self.text = text
        self.fontSize = fontSize
        self.column = column
        scrollView.transform = mirrored ? CGAffineTransform(scaleX: -1, y: 1) : .identity
        if changed {
            label.attributedText = Self.attributed(text, fontSize: fontSize)
            setNeedsLayout()
        }
    }

    static func attributed(_ text: String, fontSize: CGFloat) -> NSAttributedString {
        let font = UIFont.systemFont(ofSize: fontSize, weight: .bold)
        let paragraph = NSMutableParagraphStyle()
        paragraph.alignment = .center
        paragraph.lineSpacing = max(0, fontSize * PrompterEngine.lineHeightMultiple - font.lineHeight)
        let shadow = NSShadow()
        shadow.shadowColor = UIColor.black.withAlphaComponent(0.6)
        shadow.shadowOffset = CGSize(width: 0, height: 1)
        shadow.shadowBlurRadius = 3
        return NSAttributedString(string: text.isEmpty ? " " : text, attributes: [
            .font: font,
            .foregroundColor: UIColor.white,
            .paragraphStyle: paragraph,
            .shadow: shadow,
        ])
    }

    private var maxOffset: CGFloat {
        max(0, scrollView.contentSize.height - scrollView.bounds.height)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        guard bounds.width > 0, bounds.height > 0 else { return }
        let oldMax = maxOffset
        let progress = oldMax > 0 ? position / oldMax : 0

        // bounds + center rather than frame, because the scroll view may be mirrored.
        scrollView.bounds = CGRect(origin: scrollView.bounds.origin, size: bounds.size)
        scrollView.center = CGPoint(x: bounds.midX, y: bounds.midY)

        let sidePadding: CGFloat = 20
        let width = max(120, min(bounds.width - sidePadding * 2, fontSize * maxColumnEms))
        let fitted = label.sizeThatFits(CGSize(width: width, height: .greatestFiniteMagnitude))
        let x: CGFloat
        switch column {
        case .center: x = (bounds.width - width) / 2
        case .leading: x = sidePadding
        case .trailing: x = bounds.width - sidePadding - width
        }
        let top: CGFloat = 14
        label.frame = CGRect(x: x, y: top, width: width, height: ceil(fitted.height))
        // Room after the last line so it can scroll up near the top of the band.
        scrollView.contentSize = CGSize(width: bounds.width, height: top + ceil(fitted.height) + bounds.height * 0.6)

        // Keep the reader's place when the text size or the phone's orientation changes.
        if oldMax > 0, abs(maxOffset - oldMax) > 0.5 {
            position = min(maxOffset, progress * maxOffset)
            applyPosition()
        }

        CATransaction.begin()
        CATransaction.setDisableActions(true)
        fade.frame = bounds
        let h = bounds.height
        fade.locations = [0, NSNumber(value: Double(min(0.2, 12 / h))), NSNumber(value: Double(max(0.8, 1 - 36 / h))), 1]
        CATransaction.commit()
    }

    override func didMoveToWindow() {
        super.didMoveToWindow()
        if window != nil, displayLink == nil {
            let link = CADisplayLink(target: self, selector: #selector(tick(_:)))
            link.preferredFrameRateRange = CAFrameRateRange(minimum: 30, maximum: 120, preferred: 120)
            link.add(to: .main, forMode: .common)
            displayLink = link
            lastTimestamp = 0
        } else if window == nil {
            displayLink?.invalidate()
            displayLink = nil
        }
    }

    @objc private func tick(_ link: CADisplayLink) {
        let now = link.timestamp
        let dt = lastTimestamp == 0 ? 0 : min(0.1, now - lastTimestamp)
        lastTimestamp = now

        if engine.resetRequested {
            engine.resetRequested = false
            position = 0
            applyPosition()
        }
        guard engine.isRunning, !scrollView.isTracking, !scrollView.isDecelerating else { return }

        let limit = maxOffset
        position = min(limit, position + PrompterEngine.pointsPerSecond(speed: engine.speed, fontSize: fontSize) * CGFloat(dt))
        applyPosition()
        if position >= limit {
            engine.isRunning = false
            engine.reachedEnd = true
        }
    }

    private func applyPosition() {
        scrollView.contentOffset = CGPoint(x: 0, y: position)
    }

    @objc private func tapped() {
        engine.toggle()
    }

    // MARK: Dragging

    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        guard scrollView.isTracking || scrollView.isDecelerating else { return }
        position = min(maxOffset, max(0, scrollView.contentOffset.y))
        if engine.reachedEnd && position < maxOffset - 1 {
            engine.reachedEnd = false
        }
    }

    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        position = min(maxOffset, max(0, scrollView.contentOffset.y))
    }

    func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool) {
        if !decelerate {
            position = min(maxOffset, max(0, scrollView.contentOffset.y))
        }
    }
}
