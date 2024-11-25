interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

type ProductCategory =
  | "men's clothing"
  | "women's clothing"
  | "jewelery"
  | "electronics";

type ProductList = Product[];

interface ProductListResponse {
  data: Product[];
}

interface CategoryListResponse {
  data: string[];
}

interface SingleProductResponse {
  data: Product;
}
