import { CATEGORIES, GETPRODUCTS, SINGLE_PRODUCT } from "../endpoint";
import instance from "../instance";

export const getProducts = (limit?: number): Promise<ProductListResponse> => {
  return instance.get(GETPRODUCTS(limit));
};

export const getProductsByCategory = (
  category: ProductCategory,
  limit?: number
): Promise<ProductListResponse> => {
  const endpoint = `/products/category/${category}${
    limit ? `?limit=${limit}` : ""
  }`;
  return instance.get(endpoint);
};

export const getSingleProduct = (
  id: number
): Promise<SingleProductResponse> => {
  return instance.get(SINGLE_PRODUCT(id));
};

export const getProductCategories = (): Promise<CategoryListResponse> => {
  return instance.get(CATEGORIES);
};
