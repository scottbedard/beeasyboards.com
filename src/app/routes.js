module.exports = [

    //
    // Routes
    //
    {
        path: '/',
        component: require('src/pages/home/home'),
    },

    {
        path: '*',
        component: require('src/pages/404/404'),
    },
];
