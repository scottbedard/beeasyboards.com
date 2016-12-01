import * as types from '../types';

module.exports = {
    state: {
        cart: null,
        categories: [],
    },
    getters: {
        [types.SHOP_CART_ITEMS]: state => {
            return state.cart.items
                .map(item => item.quantity)
                .reduce((a, b) => a + b, 0);
        },
    },
    mutations: {
        [types.SHOP_CART_SET_ITEM] (state, item) {
            let existingItem = state.cart.items.find(model => model.id == item.id);

            if (! existingItem) {
                delete item.cart;
                delete item.inventory;
                state.cart.items.push(item);
            } else {
                existingItem.quantity = item.quantity;
                existingItem.updated_at = item.updated_at;
            }
        },
        [types.SHOP_INITIALIZE_CART] (state, cart) {
            if (typeof cart.items === 'undefined') {
                cart.items = [];
            }

            for (let item of cart.items) {
                delete item.cart;
                delete item.inventory;
            }

            state.cart = cart;
        },
        [types.SHOP_SET_CATEGORIES] (state, categories) {
            state.categories = categories;
        },
    },
};
