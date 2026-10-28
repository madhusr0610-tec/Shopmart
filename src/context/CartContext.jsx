import { createContext, 
     useEffect, useMemo, useState } from "react";
    
// Initializing the CartContext using createContext()
export const CartContext = createContext(null);

// Using browser local storage to store the information,
// This helps keep the cart data intact even during refreshes
const STORAGE_KEY = "shopkart_cart";

function loadCart(){
    try {
        // Trying to retrieve the stored data, or return empty array
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { // Return empty array as cart in case Error in getting local storage
        return [];
    }
}

export function CartProvider({ children }){
    const [cartItems, setCartItems ] = useState(loadCart);

    useEffect(() => {
        // Whenever cartItems state is updated, overwrite the existing localStorage item for cart
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    },[cartItems]);

    function addToCart(product){
        setCartItems((currentItems) => {
            // Dealing with the case of item already in cart
                const existingItem = currentItems.find((item) => item.id == product.id);

                if (existingItem){
                    // increase quantity of that item and update cart context
                    return currentItems.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);                
                }

            // In case the item was not in cart already, I'll return the existing array of items added with the new item
                return [
                    ...currentItems,
                    {
                        id : product.id,
                        title: product.title,
                        price : product.price,
                        thumbnail : product.thumbnail,
                        quantity : 1
                    }
                ];
        });
    }

    // Remove from Cart
    function removeFromCart(productId){
        setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    }

    // Update Cart Quantity
    function updateQuantity(productId, quantity){
        if (quantity <= 0){
            removeFromCart(productId);
            return; // exiting the function
        }

        setCartItems((currentItems) => currentItems.map((item) =>  item.id === productId ? {...item, quantity } : item));
    }

    // Clear Cart
    function clearCart(){
        setCartItems([]);
    }

    // cartCount, cartTotal
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


    // Setup the values for context, use useMemo
    const value = useMemo( // useMemo is short for 
        () => ({
            cartItems,
            cartCount,
            cartTotal, 
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }), [cartItems, cartCount, cartTotal]
    )

    // Return the CartContext Provider
    return (
        <CartContext.Provider value = {value}>
            {children}
        </CartContext.Provider>
        
    );
}