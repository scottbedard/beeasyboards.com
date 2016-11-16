import Vue from 'vue'
import VueRouter from 'vue-router'
import RootComponent from './root'
import routes from './app/routes'

//
// Configure Vue utilities and plugins
//
require('./app/boot')

//
// Configure the router
//
const router = new VueRouter({
  base: __dirname,
  mode: 'history',
  routes
})

//
// Launch the application
//
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(RootComponent)
})
