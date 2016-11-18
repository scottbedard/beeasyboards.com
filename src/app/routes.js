module.exports = [

    //
    // Routes
    //
    {
        path: '/',
        name: 'home',
        component: require('src/pages/home/home'),
    },

    {
        path: '/shop',
        name: 'shop',
        component: require('src/pages/shop/shop'),
        children: [
            {
                path: ':category?',
                name: 'shop-category',
                component: require('src/pages/shop/category/category'),
            },
        ],
    },

    {
        path: '*',
        name: '404',
        component: require('src/pages/404/404'),
    },
];
