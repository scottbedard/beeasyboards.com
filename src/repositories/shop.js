import Vue from 'vue';
import { normalizeResponse } from 'src/app/utilities/response';

export default {
    addItem(inventoryId, quantity) {
        const endpoint = '/api/bedard/shop/cart/add';
        return Vue.http.post(endpoint, { inventoryId, quantity }).then(normalizeResponse);
    },
    getCategory(slug) {
        const endpoint = `/api/bedard/shop/categories/${ slug }`;
        return Vue.http.get(endpoint).then(normalizeResponse);
    },
    getCategoryProducts(slug, params = []) {
        const endpoint = `/api/bedard/shop/categories/${ slug }/products`;
        return Vue.http.get(endpoint, params).then(normalizeResponse);
    },
    getCategories() {
        const endpoint = '/api/bedard/shop/categories';
        return Vue.http.get(endpoint).then(normalizeResponse);
    },
    getProduct(slug) {
        const endpoint = `/api/bedard/shop/products/${ slug }`;
        return Vue.http.get(endpoint).then(normalizeResponse);
    },
    removeItem(inventoryId) {
        const endpoint = `/api/bedard/shop/cart/item/${ inventoryId }`;
        return Vue.http.delete(endpoint).then(normalizeResponse);
    },
    updateQuantity(itemId, quantity) {
        const endpoint = `/api/bedard/shop/cart/item/${ itemId }`;
        return Vue.http.patch(endpoint, { quantity }).then(normalizeResponse);
    },
};
