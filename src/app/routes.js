module.exports = [

    //
    // Routes
    //
    {
        path: '/',
        component: require('src/pages/home/home'),
    },

    {
        path: '/shop',
        component: require('src/pages/shop/shop'),
        children: [
            {
                path: ':category?',
                component: require('src/pages/shop/category/category'),
            },
        ],
    },

    {
        path: '*',
        component: require('src/pages/404/404'),
    },
];
