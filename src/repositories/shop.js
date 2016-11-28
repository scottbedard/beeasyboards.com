import Vue from 'vue';
import { normalizeResponse } from 'src/app/utilities/response';

export default {
    getCategory(slug) {
        let endpoint = `/api/bedard/shop/categories/${ slug }`;
        return Vue.http.get(endpoint).then(normalizeResponse);
    },
    getCategoryProducts(slug, params = []) {
        let endpoint = `/api/bedard/shop/categories/${ slug }/products`;
        return Vue.http.get(endpoint, params).then(normalizeResponse);
    },
    getCategories() {
        let endpoint = '/api/bedard/shop/categories';
        return Vue.http.get(endpoint).then(normalizeResponse);
    },
    getProduct(slug) {
        let endpoint = `/api/bedard/shop/products/${ slug }`;
        return Vue.http.get(endpoint).then(normalizeResponse);
    },
};
