"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load saved cart when the browser opens the site
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("oss-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Could not load OSS cart:", error);
    }

    setCartLoaded(true);
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (!cartLoaded) return;

    try {
      localStorage.setItem("oss-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save OSS cart:", error);
    }
  }, [cart, cartLoaded]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      // OSS pieces are currently treated as one-of-a-kind.
      // Don't allow the same piece to be added twice.
      const alreadyInCart = currentCart.some(
        (item) => item.id === product.id
      );

      if (alreadyInCart) {
        return currentCart;
      }

      return [
        ...currentCart,
        {
          id: product.id,
          name: product.name,
          title: product.title,
          price: product.price,
          priceCents: product.priceCents,
          image: product.image,
          type: product.type,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.priceCents * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}