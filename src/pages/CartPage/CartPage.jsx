
import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/hooks/useCart";
import styles from "./CartPage.module.css";

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    // Empty cart
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className={`container ${styles.cartPage}`}>
                <h1 className="mb-4">My Cart</h1>

                <div className={styles.emptyCart}>
                    <h4>Your cart is empty!</h4>
                    <p>Add some products to your cart to see them here.</p>

                    <Link to="/products" className="btn btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * (item.quantity || 1),
        0
    );

    return (
        <div className={`container py-4 ${styles.cartPage}`}>
            <h1 className="mb-4">My Cart</h1>

            <div className="row g-4">
                {/* Cart items */}
                <div className="col-lg-8">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className={`card mb-3 ${styles.cartItem}`}
                        >
                            <div className="row g-0 align-items-center">
                                <div className="col-4 col-md-3">
                                    <img
                                        src={
                                            item.thumbnail ||
                                            item.images?.[0] ||
                                            ""
                                        }
                                        alt={item.title}
                                        className={styles.productImage}
                                    />
                                </div>

                                <div className="col-8 col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {item.title}
                                        </h5>

                                        <p className="text-muted mb-2">
                                            ${Number(item.price).toFixed(2)}
                                        </p>

                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        (item.quantity || 1) - 1
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span>{item.quantity || 1}</span>

                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        (item.quantity || 1) + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="fw-bold">
                                            Subtotal: $
                                            {(
                                                Number(item.price) *
                                                (item.quantity || 1)
                                            ).toFixed(2)}
                                        </p>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order summary */}
                <div className="col-lg-4">
                    <div className={`card ${styles.summaryCard}`}>
                        <div className="card-body">
                            <h4>Order Summary</h4>

                            <hr />

                            <p>
                                Total items:{" "}
                                {cartItems.reduce(
                                    (total, item) =>
                                        total + (item.quantity || 1),
                                    0
                                )}
                            </p>

                            <h5 className="mb-3">
                                Total: ${totalPrice.toFixed(2)}
                            </h5>

                            <Link
                                to="/products"
                                className="btn btn-outline-primary w-100 mb-2"
                            >
                                Continue Shopping
                            </Link>

                            <button
                                className="btn btn-primary w-100"
                                onClick={() =>
                                    alert("Checkout functionality coming soon!")
                                }
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;