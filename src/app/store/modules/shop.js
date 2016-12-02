import * as types from '../types';

module.exports = {
    state: {
        cart: null,
        categories: [],
    },
    getters: {
        [types.SHOP_CART_TOTAL]: ( state, getters ) => {
            let total = state.cart.items.reduce((a, b) => {
                let aTotal = a.inventory.product.price * a.inventory.quantity;
                let bTotal = b.inventory.product.price * b.inventory.quantity;

                return aTotal + bTotal;
            }, 0);
        },
        [types.SHOP_CART_ITEM_COUNT]: state => {
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
            }

            state.cart = cart;
        },
        [types.SHOP_SET_CATEGORIES] (state, categories) {
            state.categories = categories;
        },
    },
};
