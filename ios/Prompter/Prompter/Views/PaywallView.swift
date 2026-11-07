import StoreKit
import SwiftUI

struct PaywallView: View {
    @Environment(SubscriptionStore.self) private var store
    @Environment(\.dismiss) private var dismiss
    @State private var selectedID = SubscriptionStore.yearlyID
    @State private var trialEligible: [String: Bool] = [:]

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                header
                benefits
                plans
                purchaseSection
                footer
            }
            .padding(.horizontal, 20)
            .padding(.top, 56)
            .padding(.bottom, 24)
            .frame(maxWidth: 520)
            .frame(maxWidth: .infinity)
        }
        .background(Color.black.ignoresSafeArea())
        .overlay(alignment: .topTrailing) {
            Button {
                dismiss()
            } label: {
                Image(systemName: "xmark")
                    .font(.system(size: 15, weight: .bold))
                    .foregroundStyle(.white.opacity(0.8))
                    .frame(width: 34, height: 34)
                    .background(.white.opacity(0.12), in: Circle())
            }
            .accessibilityLabel("Close")
            .accessibilityIdentifier("closePaywall")
            .padding(16)
        }
        .accessibilityIdentifier("paywall")
        .task {
            if store.products.isEmpty { await store.loadProducts() }
            await loadEligibility()
        }
        .onChange(of: store.products.count) { _, _ in
            Task { await loadEligibility() }
        }
        .onChange(of: store.isPro) { _, isPro in
            if isPro { dismiss() }
        }
        .alert("Something went wrong", isPresented: Binding(get: { store.errorMessage != nil }, set: { if !$0 { store.errorMessage = nil } })) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(store.errorMessage ?? "")
        }
    }

    private var header: some View {
        VStack(spacing: 10) {
            Image(systemName: "text.below.photo")
                .font(.system(size: 44, weight: .semibold))
                .foregroundStyle(.white)
                .padding(.bottom, 4)
            Text("Read your script.\nLook at the lens.")
                .font(.system(size: 30, weight: .bold))
                .multilineTextAlignment(.center)
            Text("Record as many takes as you want.")
                .font(.body)
                .foregroundStyle(.secondary)
        }
    }

    private var benefits: some View {
        VStack(alignment: .leading, spacing: 14) {
            benefit("text.line.first.and.arrowtriangle.forward", "Your script scrolls right under the camera")
            benefit("rectangle.landscape.rotate", "Upright or sideways, in up to 4K")
            benefit("hand.tap", "Tap to pause, drag to jump, change speed on the fly")
            benefit("lock", "No account, no watermark. Everything stays on your phone")
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func benefit(_ symbol: String, _ text: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: symbol)
                .font(.system(size: 17, weight: .semibold))
                .frame(width: 26)
                .foregroundStyle(Color.accentColor)
            Text(text).font(.callout)
        }
    }

    @ViewBuilder
    private var plans: some View {
        if store.products.isEmpty {
            VStack(spacing: 12) {
                if store.isLoadingProducts {
                    ProgressView()
                } else {
                    Text("Couldn't load plans. Check your connection and try again.")
                        .font(.callout)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                    Button("Try again") { Task { await store.loadProducts() } }
                }
            }
            .frame(maxWidth: .infinity, minHeight: 120)
        } else {
            VStack(spacing: 10) {
                ForEach(store.products, id: \.id) { product in
                    planCard(product)
                }
            }
        }
    }

    private func planCard(_ product: Product) -> some View {
        let selected = product.id == selectedID
        let isYearly = product.id == SubscriptionStore.yearlyID
        return Button {
            selectedID = product.id
        } label: {
            HStack(spacing: 12) {
                Image(systemName: selected ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 22))
                    .foregroundStyle(selected ? Color.accentColor : .secondary)
                VStack(alignment: .leading, spacing: 3) {
                    HStack(spacing: 8) {
                        Text(isYearly ? "Yearly" : "Monthly").font(.headline)
                        if isYearly, let savings = savingsText {
                            Text(savings)
                                .font(.caption.weight(.bold))
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(Color.accentColor, in: Capsule())
                                .foregroundStyle(.white)
                        }
                    }
                    Text(planSubtitle(product))
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                Spacer(minLength: 8)
                Text(product.displayPrice + PaywallText.periodSuffix(product))
                    .font(.subheadline.weight(.semibold))
                    .monospacedDigit()
            }
            .padding(16)
            .background(Color.white.opacity(selected ? 0.12 : 0.05), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .strokeBorder(selected ? Color.accentColor : Color.white.opacity(0.1), lineWidth: selected ? 2 : 1)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }

    private var selectedProduct: Product? {
        store.products.first { $0.id == selectedID } ?? store.products.first
    }

    private var selectedTrial: String? {
        guard let product = selectedProduct,
              trialEligible[product.id] == true,
              let offer = product.subscription?.introductoryOffer else { return nil }
        return PaywallText.trialLabel(offer)
    }

    @ViewBuilder
    private var purchaseSection: some View {
        if let product = selectedProduct {
            VStack(spacing: 10) {
                Button {
                    Task { _ = await store.purchase(product) }
                } label: {
                    if store.isPurchasing {
                        ProgressView().tint(.black)
                    } else {
                        Text(selectedTrial.map { "Start \($0) free trial" } ?? "Continue")
                    }
                }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(store.isPurchasing)
                .accessibilityIdentifier("purchaseButton")

                Text(termsLine(product))
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }
        }
    }

    private var footer: some View {
        HStack(spacing: 18) {
            Button("Restore") { Task { await store.restore() } }
            Link("Terms", destination: AppConfig.termsURL)
            Link("Privacy", destination: AppConfig.privacyURL)
        }
        .font(.footnote.weight(.semibold))
        .foregroundStyle(.secondary)
    }

    // MARK: Text

    private var savingsText: String? {
        guard let yearly = store.yearly, let monthly = store.monthly,
              let percent = PaywallText.yearlySavingsPercent(yearly: yearly.price, monthly: monthly.price) else { return nil }
        return "Save \(percent)%"
    }

    private func planSubtitle(_ product: Product) -> String {
        if product.id == SubscriptionStore.yearlyID {
            let perMonth = (product.price / 12).formatted(product.priceFormatStyle)
            return "\(perMonth)/month, billed yearly"
        }
        return "Billed monthly"
    }

    private func termsLine(_ product: Product) -> String {
        let price = product.displayPrice + PaywallText.periodSuffix(product)
        if let trial = selectedTrial {
            return "\(trial) free trial, then \(price). Cancel anytime in Settings at least a day before the trial ends and you won't be charged."
        }
        return "\(price), renews automatically. Cancel anytime in Settings."
    }

    private func loadEligibility() async {
        for product in store.products {
            trialEligible[product.id] = await store.isEligibleForTrial(product)
        }
    }
}
