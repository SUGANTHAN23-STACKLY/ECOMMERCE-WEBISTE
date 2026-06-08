import { createContext, useState, useEffect } from "react";
import { getCart, saveCart } from "../utils/cartStorage";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;