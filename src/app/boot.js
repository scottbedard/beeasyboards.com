import Vue from 'vue';

//
// Prototype extention
//
require('./prototype');

//
// Directives
//
require('./directives/linkable');

//
// Plugins
//
require('./plugins/alert');
require('./plugins/resources');
require('./plugins/router');
require('./plugins/title');
require('./plugins/vuex');

//
// Global components
//
import components from 'src/components/global';
Object.keys(components).forEach(tag => Vue.component(tag, components[tag]));
