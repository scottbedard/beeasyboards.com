import * as types from '../types';

module.exports = {
    state: {
        isExpanded: false,
    },
    mutations: {
        [types.NAVIGATION_HIDE] (state) {
            state.isExpanded = false;
        },
        [types.NAVIGATION_SHOW] (state) {
            state.isExpanded = true;
        },
        [types.NAVIGATION_TOGGLE] (state) {
            state.isExpanded = ! state.isExpanded;
        },
    },
};
