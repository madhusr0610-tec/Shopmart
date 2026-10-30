
import { useCart } from "../../features/cart/hooks/useCart";
import CartItem from "../../features/cart/components/CartItem/CartItem";
import styles from "./CartPage.module.css";

const CartPage = () => {
    const {
        cartItems,
        cartCount,
        cartTotal,
        removeFromCart,
        updateQuantity,
        clearCart,
    } = useCart();

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                {/* Page Header */}
                <header className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>
                            SYSTEM // INVENTORY MANAGEMENT
                        </span>

                        <h1 className={styles.title}>
                            YOUR <span>GRID</span>
                        </h1>

                        <p className={styles.subtitle}>
                            Review your assets. Configure your loadout.
                        </p>
                    </div>

                    <div className={styles.headerStatus}>
                        <span className={styles.statusDot} />
                        SYSTEM ONLINE
                    </div>
                </header>

                <div className={styles.headerLine}>
                    <span />
                </div>

                {cartItems.length === 0 ? (
                    /* Empty State */
                    <section className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <span>∅</span>
                        </div>

                        <span className={styles.eyebrow}>
                            INVENTORY // 000
                        </span>

                        <h2>GRID EMPTY</h2>

                        <p>
                            No assets detected in your inventory.
                            Return to the store to acquire new assets.
                        </p>

                        <div className={styles.emptyStatus}>
                            <span className={styles.statusDot} />
                            AWAITING INPUT
                        </div>
                    </section>
                ) : (
                    <>
                        {/* Inventory Overview */}
                        <section className={styles.overview}>
                            <div className={styles.overviewItem}>
                                <span className={styles.metricLabel}>
                                    ASSETS LOADED
                                </span>
                                <strong>
                                    {String(cartItems.length).padStart(2, "0")}
                                </strong>
                            </div>

                            <div className={styles.overviewDivider} />

                            <div className={styles.overviewItem}>
                                <span className={styles.metricLabel}>
                                    TOTAL UNITS
                                </span>
                                <strong>
                                    {String(cartCount).padStart(2, "0")}
                                </strong>
                            </div>

                            <div className={styles.overviewDivider} />

                            <div className={styles.overviewItem}>
                                <span className={styles.metricLabel}>
                                    GRID STATUS
                                </span>
                                <strong className={styles.activeText}>
                                    ACTIVE
                                </strong>
                            </div>
                        </section>

                        <div className={styles.layout}>
                            {/* Inventory List */}
                            <section className={styles.inventory}>
                                <div className={styles.sectionHeader}>
                                    <div>
                                        <span className={styles.eyebrow}>
                                            SECTOR 01
                                        </span>
                                        <h2>INVENTORY</h2>
                                    </div>

                                    <span className={styles.counter}>
                                        [{cartItems.length}]
                                    </span>
                                </div>

                                <div className={styles.itemList}>
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            updateQuantity={updateQuantity}
                                            removeFromCart={removeFromCart}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className={styles.clearButton}
                                    onClick={clearCart}
                                >
                                    <span aria-hidden="true">×</span>
                                    PURGE ALL ASSETS
                                </button>
                            </section>

                            {/* Order Summary */}
                            <aside className={styles.sidebar}>
                                <div className={styles.summary}>
                                    <div className={styles.summaryHeader}>
                                        <span className={styles.eyebrow}>
                                            SECTOR 02
                                        </span>

                                        <span className={styles.summaryIcon}>
                                            ◈
                                        </span>

                                        <h2>MISSION BRIEF</h2>

                                        <p>Transaction overview</p>
                                    </div>

                                    <div className={styles.summaryBody}>
                                        <div className={styles.summaryRow}>
                                            <span>Asset types</span>
                                            <span>
                                                {String(cartItems.length).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <div className={styles.summaryRow}>
                                            <span>Total units</span>
                                            <span>
                                                {String(cartCount).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <div className={styles.summaryRow}>
                                            <span>Network fee</span>
                                            <span className={styles.free}>
                                                FREE
                                            </span>
                                        </div>

                                        <div className={styles.summaryDivider} />

                                        <span className={styles.totalLabel}>
                                            TOTAL ENERGY VALUE
                                        </span>

                                        <div className={styles.total}>
                                            <span className={styles.currency}>
                                                INR
                                            </span>
                                            <strong>
                                                {cartTotal.toFixed(2)}
                                            </strong>
                                        </div>

                                        <div className={styles.meter}>
                                            <span />
                                        </div>

                                        <div className={styles.meterLabel}>
                                            <span>LOAD CAPACITY</span>
                                            <span>ENGAGED</span>
                                        </div>

                                        <button
                                            type="button"
                                            className={styles.checkoutButton}
                                            onClick={() =>
                                                alert("Proceeding to checkout!")
                                            }
                                        >
                                            <span>INITIATE CHECKOUT</span>
                                            <span className={styles.arrow}>
                                                ↗
                                            </span>
                                        </button>

                                        <div className={styles.secureNote}>
                                            <span className={styles.statusDot} />
                                            READY FOR TRANSMISSION
                                        </div>
                                    </div>

                                    <div className={styles.panelFooter}>
                                        GRID PROTOCOL // V1.0
                                    </div>
                                </div>

                                <div className={styles.sidebarNote}>
                                    <span>◈</span>
                                    <p>
                                        All assets are staged and awaiting
                                        transaction authorization.
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </>
                )}

                {/* Page Footer */}
                <footer className={styles.footer}>
                    <span>GRID SYSTEMS © 2026</span>
                    <span>END OF TRANSMISSION</span>
                </footer>
            </div>
        </main>
    );
};

export default CartPage;