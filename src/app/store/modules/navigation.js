import {
    NAVIGATION_HIDE,
    NAVIGATION_SHOW,
    NAVIGATION_TOGGLE,
} from '../types';

module.exports = {
    state: {
        isExpanded: false,
    },
    mutations: {
        [NAVIGATION_HIDE] (state) {
            state.isExpanded = false;
        },
        [NAVIGATION_SHOW] (state) {
            state.isExpanded = true;
        },
        [NAVIGATION_TOGGLE] (state) {
            state.isExpanded = ! state.isExpanded;
        },
    },
};
