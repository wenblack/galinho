import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, WishlistItem, CartContextType } from "@/types/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "galinho_cart";
const WISHLIST_STORAGE_KEY = "galinho_wishlist";

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
    setIsInitialized(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // Persist wishlist to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized]);

  // Cart methods
  const addToCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, clickCount: item.clickCount + 1 }
            : item,
        );
      }
      return [
        ...prevCart,
        {
          id: productId,
          clickCount: 1,
          addedAt: new Date(),
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementCartItemClicks = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, clickCount: item.clickCount + 1 }
          : item,
      ),
    );
  };

  const decrementCartItemClicks = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, clickCount: Math.max(0, item.clickCount - 1) }
            : item,
        )
        .filter((item) => item.clickCount > 0),
    );
  };

  // Wishlist methods
  const addToWishlist = (productId: number) => {
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find((item) => item.id === productId);
      if (existingItem) {
        return prevWishlist.map((item) =>
          item.id === productId
            ? { ...item, clickCount: item.clickCount + 1 }
            : item,
        );
      }
      return [
        ...prevWishlist,
        {
          id: productId,
          clickCount: 1,
          addedAt: new Date(),
        },
      ];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId),
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const incrementWishlistItemClicks = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.map((item) =>
        item.id === productId
          ? { ...item, clickCount: item.clickCount + 1 }
          : item,
      ),
    );
  };

  const decrementWishlistItemClicks = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist
        .map((item) =>
          item.id === productId
            ? { ...item, clickCount: Math.max(0, item.clickCount - 1) }
            : item,
        )
        .filter((item) => item.clickCount > 0),
    );
  };

  // Transfer wishlist items to cart
  const moveWishlistToCart = () => {
    wishlist.forEach((item) => {
      for (let i = 0; i < item.clickCount; i++) {
        addToCart(item.id);
      }
    });
    setWishlist([]);
  };

  // Utility methods
  const isInCart = (productId: number) => {
    return cart.some((item) => item.id === productId);
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  const getCartItemClickCount = (productId: number) => {
    const item = cart.find((item) => item.id === productId);
    return item?.clickCount ?? 0;
  };

  const getWishlistItemClickCount = (productId: number) => {
    const item = wishlist.find((item) => item.id === productId);
    return item?.clickCount ?? 0;
  };

  const value: CartContextType = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    clearCart,
    incrementCartItemClicks,
    decrementCartItemClicks,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    incrementWishlistItemClicks,
    decrementWishlistItemClicks,
    isInCart,
    isInWishlist,
    getCartItemClickCount,
    getWishlistItemClickCount,
    moveWishlistToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
