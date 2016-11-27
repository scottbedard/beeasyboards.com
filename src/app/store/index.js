import Vuex from 'vuex';

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    modules: {
        navigation: require('./modules/navigation'),
        shop: require('./modules/shop'),
        window: require('./modules/window'),
    },
    strict: debug,
});

module.exports = store;
