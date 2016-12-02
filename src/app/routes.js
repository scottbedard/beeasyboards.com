module.exports = [

    //
    // Cart
    //
    {
        path: '/cart',
        name: 'cart',
        component: require('src/pages/cart/cart'),
    },

    //
    // Home
    //
    {
        path: '/',
        name: 'home',
        component: require('src/pages/home/home'),
    },

    //
    // Shop
    //
    {
        path: '/shop/product/:slug',
        name: 'shop-product',
        component: require('src/pages/shop/product/product'),
    },

    {
        path: '/shop/:category?/:page?',
        name: 'shop-category',
        component: require('src/pages/shop/category/category'),
    },

    //
    // Errors
    //
    {
        path: '/error',
        name: '500',
        component: require('src/pages/500/500'),
    },

    {
        path: '*',
        name: '404',
        component: require('src/pages/404/404'),
    },
];
