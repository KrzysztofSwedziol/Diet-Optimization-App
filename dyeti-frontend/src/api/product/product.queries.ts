import { Product, ProductWithPreference } from '@/types';
import { apiRequest } from '../axios';
import { HttpMethod } from '../types';

const getProducts = async () => {
  try {
    const response = await apiRequest<Product[]>(HttpMethod.GET, '/api/product');
    return response;
  } catch (error) {
    throw error;
  }
};

const getProductsWithPreferences = async () => {
  try {
    const response = await apiRequest<ProductWithPreference[]>(HttpMethod.GET, '/api/preference');
    return response;
  } catch (error) {
    throw error;
  }
};

const PRODUCT_QUERIES = {
  GET_PRODUCTS: getProducts,
  GET_PRODUCTS_WITH_PREFERENCES: getProductsWithPreferences,
};

export default PRODUCT_QUERIES;
