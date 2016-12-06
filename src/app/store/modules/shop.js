import * as types from '../types';

module.exports = {
    state: {
        cart: null,
        categories: [],
    },
    getters: {
        [types.SHOP_CART_TOTAL]: ( state, getters ) => {
            let total = state.cart.items.reduce((a, b) => {
                let aPrice = typeof a.inventory !== 'undefined'
                    ? a.inventory.product.price
                    : 0;

                let aQuantity = typeof a.inventory !== 'undefined'
                    ? a.inventory.quantity
                    : 0;

                let bPrice = typeof b.inventory !== 'undefined'
                    ? b.inventory.product.price
                    : 0;

                let bQuantity = typeof b.inventory !== 'undefined'
                    ? b.inventory.quantity
                    : 0;

                return (aPrice * aQuantity) + (bPrice * bQuantity);
            }, 0);
        },
        [types.SHOP_CART_ITEM_COUNT]: state => {
            return state.cart.items
                .map(item => item.quantity)
                .reduce((a, b) => a + b, 0);
        },
    },
    mutations: {
        [types.SHOP_CART_ITEM_REMOVED] (state, item) {
            let index = state.cart.items.indexOf(item);

            if (index > -1) {
                state.cart.items.splice(index, 1);
            }
        },
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
