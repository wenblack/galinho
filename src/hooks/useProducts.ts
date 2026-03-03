import { useQuery } from "@tanstack/react-query";
import { Product, ProductResponse } from "@/types/product";
import { mockProducts } from "@/data/products";

// Configure your API endpoint here
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Fetch products from API
 * Replace with your actual API endpoint
 */
const fetchProducts = async (
  page: number = 1,
  pageSize: number = 10,
  category?: string
): Promise<ProductResponse> => {
  // TODO: Replace with actual API call
  // const params = new URLSearchParams({
  //   page: page.toString(),
  //   pageSize: pageSize.toString(),
  //   ...(category && { category }),
  // });
  //
  // const response = await fetch(`${API_BASE_URL}/products?${params}`);
  // if (!response.ok) throw new Error("Failed to fetch products");
  // return response.json();

  // Mock implementation - remove when API is ready
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      const filteredProducts = category
        ? mockProducts.filter((p) => p.category === category)
        : mockProducts;

      resolve({
        data: filteredProducts.slice(startIdx, endIdx),
        total: filteredProducts.length,
        page,
        pageSize,
      });
    }, 500); // Simulate network delay
  });
};

/**
 * Hook to fetch products with caching and pagination support
 */
export const useProducts = (
  page: number = 1,
  pageSize: number = 10,
  category?: string
) => {
  return useQuery({
    queryKey: ["products", page, pageSize, category],
    queryFn: () => fetchProducts(page, pageSize, category),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Hook to fetch a single product by ID
 */
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product | null> => {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/products/${id}`);
      // if (!response.ok) return null;
      // return response.json();

      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockProducts.find((p) => p.id === id) || null);
        }, 300);
      });
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Get all mock products synchronously (for development)
 */
export const getAllMockProducts = (): Product[] => {
  return mockProducts;
};
