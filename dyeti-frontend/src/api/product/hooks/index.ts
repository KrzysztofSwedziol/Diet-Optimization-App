import { useQuery } from '@tanstack/react-query';
import KEYS from '../product.keys';
import PRODUCT_QUERIES from '../product.queries';

export const useGetProducts = () => {
  return useQuery({
    queryKey: KEYS.GET_PRODUCTS,
    queryFn: PRODUCT_QUERIES.GET_PRODUCTS,
  });
};

export const useGetProductsWithPreferences = () => {
  return useQuery({
    queryKey: KEYS.GET_PRODUCTS_WITH_PREFERENCES,
    queryFn: PRODUCT_QUERIES.GET_PRODUCTS_WITH_PREFERENCES,
  });
};
