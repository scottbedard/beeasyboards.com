import * as types from '../types';

module.exports = {
    state: {
        cart: null,
        categories: [],
    },
    mutations: {
        [types.SHOP_INITIALIZE_CART] (state, cart) {
            if (typeof cart.items === 'undefined') {
                cart.items = [];
            }

            state.cart = cart;
        },
        [types.SHOP_SET_CATEGORIES] (state, categories) {
            state.categories = categories;
        },
    },
};
