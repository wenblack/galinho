export interface CartItem {
  id: number;
  clickCount: number;
  addedAt: Date;
}

export interface WishlistItem {
  id: number;
  clickCount: number;
  addedAt: Date;
}

export interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  
  // Cart methods
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  incrementCartItemClicks: (productId: number) => void;
  
  // Wishlist methods
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  incrementWishlistItemClicks: (productId: number) => void;
  
  // Utility methods
  isInCart: (productId: number) => boolean;
  isInWishlist: (productId: number) => boolean;
  getCartItemClickCount: (productId: number) => number;
  getWishlistItemClickCount: (productId: number) => number;
}
