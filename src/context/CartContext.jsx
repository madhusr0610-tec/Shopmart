
import {
    createContext,
    useEffect,
    useMemo,
    useState,
    useCallback
} from "react";

export const CartContext = createContext(null);

const STORAGE_KEY = "shopkart_cart";

function loadCart() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(loadCart);
    const [toastMessage, setToastMessage] = useState("");

    // Persist cart items in localStorage
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    // Add to Cart
    const addToCart = useCallback((product) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1
                          }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity: 1
                }
            ];
        });

        setToastMessage(`${product.title} added to cart!`);
    }, []);

    // Remove from Cart
    const removeFromCart = useCallback((productId) => {
        const product = cartItems.find(
            (item) => item.id === productId
        );

        if (!product) return;

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== productId
            )
        );

        setToastMessage(`${product.title} removed from cart!`);
    }, [cartItems]);

    // Update Cart Quantity
    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }, [removeFromCart]);

    // Clear Cart
    const clearCart = useCallback(() => {
        setCartItems([]);
        setToastMessage("Cart cleared successfully!");
    }, []);

    // Close Toast
    const closeToast = useCallback(() => {
        setToastMessage("");
    }, []);

    // Cart Count and Total
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Context Values
    const value = useMemo(
        () => ({
            cartItems,
            cartCount,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toastMessage,
            closeToast
        }),
        [
            cartItems,
            cartCount,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toastMessage,
            closeToast
        ]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}