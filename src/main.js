import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './app/routes';
import { sync } from 'vuex-router-sync';

//
// Boot up our application
//
require('./app/boot');

//
// Configure the router and store
//
const router = new VueRouter({
    base: __dirname,
    mode: 'history',
    routes,
});

const store = require('./app/store');

sync(store, router);

//
// Launch the application
//
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(require('./root')),
});
