export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
}

export interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
}
