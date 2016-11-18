import Vue from 'vue';

export default {
    getCategory(slug) {
        return Vue.http.get(`/api/bedard/shop/categories/${ slug }`);
    },
    getCategoryProducts(slug, params = []) {
        return Vue.http.get(`/api/bedard/shop/categories/${ slug }/products`, params);
    },
    getCategories() {
        return Vue.http.get('/api/bedard/shop/categories');
    },
    getProduct(slug) {
        return Vue.http.get(`/api/bedard/shop/products/${ slug }`);
    },
};
