import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      return prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prevItems, { ...product, quantity: 1 }];
  });
};

export function useCart() {
    const context = useContext(CartContext);

    if (!context){
        throw new Error("useCart must be used inside CartProvider.")
    }

    return context;
}

