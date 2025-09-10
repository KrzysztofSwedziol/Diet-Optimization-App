import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import KEYS from '../product.keys';
import PRODUCT_QUERIES from '../product.queries';
import PRODUCT_MUTATIONS from '../product.mutations';
import { ProductWithPreference } from '@/types';

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

export const useUpdateProductPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: KEYS.UPDATE_PRODUCT_PREFERENCE,
    mutationFn: PRODUCT_MUTATIONS.UPDATE_PRODUCT_PREFERENCE,
    onMutate: async ({ productId, preference }) => {
      await queryClient.cancelQueries({ queryKey: KEYS.GET_PRODUCTS_WITH_PREFERENCES });
      const previousProducts = queryClient.getQueryData(KEYS.GET_PRODUCTS_WITH_PREFERENCES);
      queryClient.setQueryData<ProductWithPreference[]>(KEYS.GET_PRODUCTS_WITH_PREFERENCES, old => {
        if (!old) return old;
        return old.map(product => {
          if (product.product.id === productId) {
            return { ...product, preference };
          }
          return product;
        });
      });
      return { previousProducts };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(KEYS.GET_PRODUCTS_WITH_PREFERENCES, context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.GET_PRODUCTS_WITH_PREFERENCES });
    },
  });
};
