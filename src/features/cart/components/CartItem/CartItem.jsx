
import styles from "./CartItem.module.css";

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
    const subtotal = item.price * item.quantity;

    return (
        <article className={styles.cartitem}>
            {/* Angular HUD header */}
            <div className={styles.topBar}>
                <span className={styles.status}>
                    <span className={styles.statusDot} />
                    ITEM ONLINE
                </span>
                <span className={styles.itemId}>
                    ID // {String(item.id).padStart(4, "0")}
                </span>
            </div>

            <div className={styles.content}>
                {/* Product visual */}
                <div className={styles.visual}>
                    <div className={styles.imageFrame}>
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className={styles.productImage}
                        />
                        <span className={styles.cornerTL} />
                        <span className={styles.cornerBR} />
                    </div>

                    <span className={styles.visualLabel}>
                        DIGITAL ASSET
                    </span>
                </div>

                {/* Product information */}
                <div className={styles.details}>
                    <span className={styles.eyebrow}>
                        INVENTORY / {item.quantity > 1 ? "STACK" : "UNIT"}
                    </span>

                    <h3 className={styles.productTitle}>
                        {item.title}
                    </h3>

                    <div className={styles.priceRow}>
                        <span className={styles.priceLabel}>
                            UNIT VALUE
                        </span>
                        <span className={styles.price}>
                            ₹{Number(item.price).toFixed(2)}
                        </span>
                    </div>

                    {/* Gamified quantity selector */}
                    <div className={styles.quantitySection}>
                        <span className={styles.quantityLabel}>
                            QUANTITY CONTROL
                        </span>

                        <div className={styles.controls}>
                            <button
                                type="button"
                                className={styles.controlButton}
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity - 1
                                    )
                                }
                                aria-label={`Decrease quantity of ${item.title}`}
                            >
                                −
                            </button>

                            <div
                                className={styles.quantityDisplay}
                                aria-live="polite"
                            >
                                <span className={styles.quantity}>
                                    {String(item.quantity).padStart(2, "0")}
                                </span>
                                <span className={styles.units}>
                                    UNITS
                                </span>
                            </div>

                            <button
                                type="button"
                                className={styles.controlButton}
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity + 1
                                    )
                                }
                                aria-label={`Increase quantity of ${item.title}`}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Total and removal */}
                    <div className={styles.footer}>
                        <div className={styles.subtotalBlock}>
                            <span className={styles.subtotalLabel}>
                                STACK VALUE
                            </span>
                            <strong className={styles.subtotal}>
                                ₹{subtotal.toFixed(2)}
                            </strong>
                        </div>

                        <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => removeFromCart(item.id)}
                        >
                            <span aria-hidden="true">×</span>
                            EJECT
                        </button>
                    </div>
                </div>
            </div>

            {/* Neon bottom rail */}
            <div className={styles.bottomRail}>
                <span />
                <span />
                <span />
                <span />
                <span className={styles.railLabel}>
                    SYSTEM // ACTIVE
                </span>
            </div>
        </article>
    );
};

export default CartItem;