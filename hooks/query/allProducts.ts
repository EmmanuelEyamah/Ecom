import { queryKeys } from "@/constants/query-keys";
import {
  getProductCategories,
  getProducts,
  getProductsByCategory,
  getSingleProduct,
} from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (limit?: number) => {
  return useQuery({
    queryKey: [queryKeys.products, limit],
    queryFn: () => getProducts(limit),
  });
};

export const useGetProductsByCategory = (
  category: ProductCategory,
  limit?: number,
  options?: any
) => {
  return useQuery<ProductListResponse>({
    queryKey: [queryKeys.products, category, limit],
    queryFn: () => getProductsByCategory(category, limit),
    ...options,
  });
};

export const useGetSingleProduct = (id: number) => {
  return useQuery<SingleProductResponse>({
    queryKey: [queryKeys.single_product, id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
  });
};

export const useGetProductCategories = () => {
  return useQuery({
    queryKey: [queryKeys.product_categories],
    queryFn: getProductCategories,
  });
};

export const useGetHighRatedProducts = (limit = 5) => {
  return useQuery({
    queryKey: [queryKeys.high_rated_products, limit],
    queryFn: async () => {
      const products = await getProducts(limit);
      return products.data.filter(
        (product: { rating: { rate: number } }) => product.rating.rate > 4
      );
    },
  });
};

export const useGetLowPriceProducts = (limit = 5) => {
  return useQuery({
    queryKey: [queryKeys.low_price_products, limit],
    queryFn: async () => {
      const products = await getProducts(limit);
      return products.data.sort(
        (a: { price: number }, b: { price: number }) => a.price - b.price
      );
    },
  });
};
