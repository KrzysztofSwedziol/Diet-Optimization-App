import { ProductWithPreference } from '@/types';
import { apiRequest } from '../axios';
import { HttpMethod } from '../types';
import { UpdateProductPreferencePayload } from './types';

const updateProductPreference = async ({ productId, preference }: UpdateProductPreferencePayload) => {
  try {
    return await apiRequest<ProductWithPreference>(HttpMethod.PUT, `/api/preference`, {
      product: { id: productId },
      preference,
    });
  } catch (error) {
    throw error;
  }
};

const MUTATION = {
  UPDATE_PRODUCT_PREFERENCE: updateProductPreference,
};

export default MUTATION;
