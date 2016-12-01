import * as types from '../types';

module.exports = {
    state: {
        cart: null,
        categories: [],
    },
    getters: {
        [types.SHOP_CART_ITEMS]: state => state.cart.items.reduce((a, b) => a.quantity + b.quantity, 0),
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
