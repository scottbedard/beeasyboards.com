import Vue from 'vue';

//
// Directives
//
require('./directives/linkable');

//
// Plugins
//
require('./plugins/resources');
require('./plugins/router');
require('./plugins/title');
require('./plugins/vuex');

//
// Global components
//
import components from 'src/components/global';
Object.keys(components).forEach(tag => Vue.component(tag, components[tag]));
