import Vue from 'vue';
import { normalizeResponse } from 'src/app/utilities/response';

export default {
    getCart() {
        let endpoint = `/api/bedard/shop/cart`;
        return Vue.http.get(endpoint).then(normalizeResponse);
    },
};
