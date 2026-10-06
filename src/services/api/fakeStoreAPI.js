 import apiClient from './axiosClient';

eclerxport async function getProducts() {
    const response  = await apiClient.get('/products');
    return response.data;
}
export async function getProduct(id) {
    const response  = await apiClient.get(`/products/${id}`);
    return response.data;
}

export async function getCategories() {
    const response  = await apiClient.get('/products/categories');
    return response.data;
}

export async function getProductsByCategory(category) {
    const response  = await apiClient.get(`/products/category/${category}`);
    return response.data;
}