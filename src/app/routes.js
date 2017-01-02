module.exports = [

    //
    // Cart
    //
    {
        path: '/cart',
        name: 'cart',
        component: require('src/pages/cart/cart'),
        component: r => require.ensure([], () => r(require('src/pages/cart/cart')), 'cart'),
    },

    //
    // Home
    //
    {
        path: '/',
        name: 'home',
        component: r => require.ensure([], () => r(require('src/pages/home/home')), 'home'),
    },

    //
    // Shop
    //
    {
        path: '/shop/product/:slug',
        name: 'shop-product',
        component: r => require.ensure([], () => r(require('src/pages/shop/product/product')), 'shop'),
    },

    {
        path: '/shop/:category?',
        name: 'shop-category',
        component: r => require.ensure([], () => r(require('src/pages/shop/category/category')), 'shop'),
    },

    //
    // Errors
    //
    {
        path: '/error',
        name: '500',
        component: r => require.ensure([], () => r(require('src/pages/500/500')), 'error'),
    },

    {
        path: '*',
        name: '404',
        component: r => require.ensure([], () => r(require('src/pages/404/404')), 'error'),
    },
];
