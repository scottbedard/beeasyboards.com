import * as types from '../types';

module.exports = {
    state: {
        categories: [],
    },
    mutations: {
        [types.SHOP_SET_CATEGORIES] (state, categories) {
            state.categories = categories;
        },
    },
};
