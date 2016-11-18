module.exports = [

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
        path: '/shop',
        name: 'shop',
        component: require('src/pages/shop/shop'),
        children: [
            {
                path: 'product/:slug',
                name: 'shop-product',
                component: require('src/pages/shop/product/product'),
            },
            {
                path: ':category?/:page?',
                name: 'shop-category',
                component: require('src/pages/shop/category/category'),
            },
        ],
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
