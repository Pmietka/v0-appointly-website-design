import Foundation
import Observation
import StoreKit

/// One subscription group, two plans, a free trial on both. Prices, trial
/// length and plan names all come from App Store Connect, so nothing about
/// pricing is hardcoded in the app.
@MainActor
@Observable
final class SubscriptionStore {
    static let yearlyID = "pro.yearly"
    static let monthlyID = "pro.monthly"
    static let productIDs = [yearlyID, monthlyID]

    private(set) var products: [Product] = []
    private(set) var isPro = false
    private(set) var isLoadingProducts = false
    private(set) var productsFailed = false
    private(set) var isPurchasing = false
    var errorMessage: String?

    @ObservationIgnored private let forcePro: Bool
    @ObservationIgnored private var updatesTask: Task<Void, Never>?

    init(forcePro: Bool = false) {
        self.forcePro = forcePro
        if forcePro {
            isPro = true
            return
        }
        // Renewals, refunds, Ask to Buy approvals and purchases made on
        // another device all arrive here.
        updatesTask = Task { [weak self] in
            for await result in Transaction.updates {
                if case .verified(let transaction) = result {
                    await transaction.finish()
                }
                await self?.refreshEntitlements()
            }
        }
        Task { [weak self] in
            await self?.refreshEntitlements()
            await self?.loadProducts()
        }
    }

    var yearly: Product? { products.first { $0.id == Self.yearlyID } }
    var monthly: Product? { products.first { $0.id == Self.monthlyID } }

    func loadProducts() async {
        guard !isLoadingProducts else { return }
        isLoadingProducts = true
        productsFailed = false
        do {
            let loaded = try await Product.products(for: Self.productIDs)
            products = loaded.sorted { a, b in
                (Self.productIDs.firstIndex(of: a.id) ?? 0) < (Self.productIDs.firstIndex(of: b.id) ?? 0)
            }
            productsFailed = products.isEmpty
        } catch {
            productsFailed = true
        }
        isLoadingProducts = false
    }

    func refreshEntitlements() async {
        if forcePro { return }
        var active = false
        for await result in Transaction.currentEntitlements {
            if case .verified(let transaction) = result,
               Self.productIDs.contains(transaction.productID),
               transaction.revocationDate == nil {
                active = true
            }
        }
        isPro = active
    }

    /// Returns true when the purchase went through and Pro is unlocked.
    func purchase(_ product: Product) async -> Bool {
        guard !isPurchasing else { return false }
        isPurchasing = true
        defer { isPurchasing = false }
        do {
            switch try await product.purchase() {
            case .success(let verification):
                guard case .verified(let transaction) = verification else {
                    errorMessage = "The App Store couldn't verify that purchase. Please try again."
                    return false
                }
                await transaction.finish()
                await refreshEntitlements()
                return isPro
            case .pending:
                errorMessage = "Your purchase is waiting for approval. Prompter unlocks as soon as it's approved."
                return false
            case .userCancelled:
                return false
            @unknown default:
                return false
            }
        } catch {
            errorMessage = error.localizedDescription
            return false
        }
    }

    func restore() async {
        do {
            try await AppStore.sync()
        } catch {
            // The user closing the Apple ID prompt is not worth an alert.
            if let storeError = error as? StoreKitError, case .userCancelled = storeError { return }
            errorMessage = error.localizedDescription
            return
        }
        await refreshEntitlements()
        if !isPro {
            errorMessage = "No active subscription was found for this Apple ID."
        }
    }

    func isEligibleForTrial(_ product: Product) async -> Bool {
        guard let subscription = product.subscription, subscription.introductoryOffer != nil else { return false }
        return await subscription.isEligibleForIntroOffer
    }
}

/// Wording for the paywall, kept separate so it can be unit tested.
enum PaywallText {
    /// "7-day", "1-month" and so on, for a free trial offer. Nil for anything else.
    static func trialLabel(_ offer: Product.SubscriptionOffer) -> String? {
        guard offer.paymentMode == .freeTrial else { return nil }
        return trialLabel(value: offer.period.value * max(1, offer.periodCount), unit: offer.period.unit)
    }

    static func trialLabel(value: Int, unit: Product.SubscriptionPeriod.Unit) -> String? {
        switch unit {
        case .day: return "\(value)-day"
        case .week: return "\(value * 7)-day"
        case .month: return "\(value)-month"
        case .year: return "\(value)-year"
        @unknown default: return nil
        }
    }

    static func periodSuffix(_ product: Product) -> String {
        guard let period = product.subscription?.subscriptionPeriod else { return "" }
        switch period.unit {
        case .day: return period.value == 7 ? "/week" : "/day"
        case .week: return "/week"
        case .month: return period.value == 1 ? "/month" : "/\(period.value) months"
        case .year: return "/year"
        @unknown default: return ""
        }
    }

    /// Whole percent saved by paying yearly instead of 12 monthly payments.
    static func yearlySavingsPercent(yearly: Decimal, monthly: Decimal) -> Int? {
        guard monthly > 0 else { return nil }
        let ratio = NSDecimalNumber(decimal: yearly / (monthly * 12)).doubleValue
        let percent = Int(((1 - ratio) * 100).rounded(.down))
        return percent >= 5 ? percent : nil
    }
}
