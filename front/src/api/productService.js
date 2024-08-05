import axios from 'axios';

export default class ProductService {
  static async getAllProducts(sortOption = 'alphabetical') {
    try {
      const response = await axios.get('http://localhost:3800/products', {
        params: { sort: sortOption },
      });
      return response.data;
    } catch (error) {
      console.error('Internal error: GET_ALL_PRODUCTS', error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const response = await axios.get(`http://localhost:3800/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Internal error: GET_PRODUCT_BY_ID', error);
      throw error;
    }
  }

  static async createProduct(product) {
    try {
      const response = await axios.post(
        'http://localhost:3800/products',
        product
      );
      return response.data;
    } catch (error) {
      console.error('Internal error: POST_PRODUCT', error);
      throw error;
    }
  }

  static async editProduct(product, id) {
    try {
      const response = await axios.put(
        `http://localhost:3800/products/${id}`,
        product
      );
      return response.data;
    } catch (error) {
      console.error('Internal error: PUT_PRODUCT', error);
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3800/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Internal error: DELETE_PRODUCT', error);
      throw error;
    }
  }
}
