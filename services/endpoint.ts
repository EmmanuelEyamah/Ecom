export const CATEGORIES = "/products/categories";
export const PRODUCTS = "/products";
export const GETPRODUCTS = (limit?: number) => {
  return limit ? `${PRODUCTS}?limit=${limit}` : PRODUCTS;
};
export const SINGLE_PRODUCT = (id: number) => `/products/${id}`;
