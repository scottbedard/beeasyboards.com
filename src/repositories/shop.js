import Vue from 'vue';

export default {
    getCategories() {
        return Vue.http.get('/api/bedard/shop/categories');
    },
};
