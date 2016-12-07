import Vuex from 'vuex';

const store = new Vuex.Store({
    modules: {
        alert: require('./modules/alert'),
        navigation: require('./modules/navigation'),
        shop: require('./modules/shop'),
        window: require('./modules/window'),
    },
    strict: process.env.NODE_ENV !== 'production',
});

module.exports = store;
