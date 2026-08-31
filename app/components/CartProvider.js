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
  const parsedCart = JSON.parse(savedCart);

  const normalizedCart = parsedCart.map((item) => ({
    ...item,
    inventoryType: item.inventoryType || "unique",
    availableQuantity: item.availableQuantity ?? 1,
    quantity: item.quantity ?? 1,
  }));

  setCart(normalizedCart);
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
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      // If the item is already in the cart...
     if (existingItem) {
  const inventoryType =
    existingItem.inventoryType || "unique";

  const availableQuantity =
    existingItem.availableQuantity ?? 1;

  // One-of-a-kind pieces can never exceed quantity 1.
  if (inventoryType === "unique") {
    return currentCart;
  }

  // Limited-stock pieces cannot exceed available inventory.
  if (
    existingItem.quantity >= availableQuantity
  ) {
          return currentCart;
        }

        // Increase quantity for limited-stock pieces.
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Don't add anything that has no available inventory.
      if (product.availableQuantity <= 0) {
        return currentCart;
      }

      // Add a new item to the cart.
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
          inventoryType:
            product.inventoryType || "unique",
          availableQuantity:
            product.availableQuantity ?? 1,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        // Unique pieces stay at quantity 1.
        if (item.inventoryType === "unique") {
          return item;
        }

        // Don't exceed available inventory.
        if (item.quantity >= item.availableQuantity) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
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

  const getCartQuantity = (productId) => {
    const item = cart.find(
      (cartItem) => cartItem.id === productId
    );

    return item?.quantity || 0;
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
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        isInCart,
        getCartQuantity,
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