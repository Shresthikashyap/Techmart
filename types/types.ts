export type User = {
    userId: number;
    name: string,
    email: string;
    password?: string;
};

export type Token = {
    accessToken: string;
};

export type Category = {
    categoryId: number;
    name: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type Product = {
    productId: number;
    name: string;
    weight?: string;
    price: number;
    categories?: string;
    image: string;
    description: string;
    rating_count?: number;
    categoryId?: number | undefined;
    productType?: string;
    inStock?: boolean;
    onSale?: boolean;
};

// Fixed CartItem type to match actual data structure
export type CartItem = {
    cartItemId?: number;
    userId?: number;
    productId?: number;
    quantity?: number ;
    createdAt?: string;
    updatedAt?: string;
    product: Product;
    category?: string | Category; // Allow both string and Category object
};

export type Cart = CartItem[];

// Fixed ComparisonItem type (corrected typo and structure)
export type ComparisonItem = {
    compareItemId?: number;
    userId?: number;
    productId?: number;
    createdAt?: string;
    updatedAt?: string;
    product: Product;
    category?: string | Category; // Allow both string and Category object
};

export type Comparison = ComparisonItem[];

// Fixed WishlistItem type to match actual data structure
export type WishlistItem = {
    wishlistItemId: number;
    userId: number;
    productId: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
};

export type Wishlist = WishlistItem[];

export type ProductItem = CartItem | ComparisonItem | WishlistItem | Product;

// Helper type for components that can accept any product-like item
export type ProductDisplay = Product | CartItem | ComparisonItem | WishlistItem;