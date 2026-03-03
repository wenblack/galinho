# E-commerce Product System Guide

## Overview

The product system is designed to work seamlessly with mock data during development and easily transition to real API calls for production.

## File Structure

```
src/
├── types/
│   └── product.ts           # Product interfaces & types
├── data/
│   └── products.ts          # Mock product data
├── hooks/
│   └── useProducts.ts       # React Query hooks for API calls
├── components/
│   └── ProductList.tsx      # Reusable FlatList-like component
├── pages/
│   ├── FeaturedProducts.tsx # Featured products section
│   └── Products.tsx         # Full products catalog page
```

## Usage

### 1. **Product Types** (`types/product.ts`)

Defines TypeScript interfaces:

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
}
```

### 2. **Mock Data** (`data/products.ts`)

Contains sample product data. Replace with API calls when ready.

```typescript
import { mockProducts } from "@/data/products";

// Use directly in components
const products = mockProducts;
```

### 3. **React Query Hooks** (`hooks/useProducts.ts`)

Two main hooks for fetching products:

#### `useProducts(page, pageSize, category?)`

Fetch paginated products:

```typescript
import { useProducts } from "@/hooks/useProducts";

const MyComponent = () => {
  const { data, isLoading, error } = useProducts(1, 10, "Compressores");

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <ProductList products={data.data} />}
    </>
  );
};
```

#### `useProduct(id)`

Fetch a single product:

```typescript
const { data: product } = useProduct(1);
```

### 4. **ProductList Component** (`components/ProductList.tsx`)

Reusable list component (similar to React Native FlatList):

```typescript
import ProductList from "@/components/ProductList";
import { Product } from "@/types/product";

<ProductList
  products={products}
  columns={4}
  layout="grid"
  isLoading={false}
  onProductClick={(product: Product) => console.log(product)}
/>
```

**Props:**

- `products: Product[]` - Array of products to display
- `columns?: number` - Grid columns (2, 3, 4, 6)
- `layout?: "grid" | "list"` - Display layout
- `isLoading?: boolean` - Show loading skeleton
- `onProductClick?: (product: Product) => void` - Product selection handler

## Integration Steps

### Step 1: Setup Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://your-api.com/api
```

### Step 2: Update the API Call

In `hooks/useProducts.ts`, replace the mock implementation:

```typescript
const fetchProducts = async (
  page: number = 1,
  pageSize: number = 10,
  category?: string,
): Promise<ProductResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(category && { category }),
  });

  const response = await fetch(`${API_BASE_URL}/products?${params}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};
```

### Step 3: Update Mock Data (Optional)

Add more products to `data/products.ts`:

```typescript
export const mockProducts: Product[] = [
  {
    id: 5,
    name: "New Product",
    description: "Description",
    price: "R$ 999,99",
    image: productImage,
    category: "Category",
    rating: 4.5,
    inStock: true,
  },
  // ... more products
];
```

## Example Pages

### Featured Products Section

[FeaturedProducts.tsx](src/components/FeaturedProducts.tsx)

- Shows 4 featured products
- Uses ProductList component
- Handles product selection

### Full Catalog Page

[Products.tsx](src/pages/Products.tsx)

- Full product listing with pagination
- Category filtering
- Adjustable page size
- Real-time loading states

## Adding to Router

Update `src/App.tsx`:

```typescript
import ProductsCatalog from "./pages/Products";

// Add route
<Route path="/products" element={<ProductsCatalog />} />
```

## Testing with Mock Data

The system uses React Query's caching which simulates API behavior:

```typescript
// Mock delay simulates network latency
setTimeout(() => {
  resolve({ data, total, page, pageSize });
}, 500);
```

## API Response Format

Expected API response format (update according to your backend):

```json
{
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Description",
      "price": "R$ 0.00",
      "image": "url",
      "category": "Category",
      "rating": 4.5,
      "inStock": true
    }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 10
}
```

## Features

✅ Type-safe product interfaces
✅ Mock data for development
✅ React Query integration
✅ Pagination support
✅ Category filtering
✅ Loading states
✅ Error handling
✅ Reusable components
✅ Easy API migration

## Next Steps

1. **Add API endpoint** - Update `useProducts` hook with real API URL
2. **Implement product detail page** - Use `useProduct` hook
3. **Add cart functionality** - Create cart store/context
4. **Implement filters** - Extend ProductList props
5. **Add search** - Add search to `useProducts` hook
6. **Implement sorting** - Add sort param to fetch function

## Troubleshooting

**Products not showing?**

- Check if `mockProducts` has data
- Verify ProductList props are correct
- Check React Query DevTools for fetch status

**API not working?**

- Verify `VITE_API_URL` is correct
- Check browser console for errors
- Verify backend is running
- Check CORS headers if cross-origin

**Layout issues?**

- Tailwind CSS grid classes support: `grid-cols-2`, `grid-cols-3`, `grid-cols-4`, `grid-cols-6`
- Adjust `columns` prop in ProductList
- Check responsive breakpoints (sm, md, lg)
