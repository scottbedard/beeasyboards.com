import * as types from '../types';
import { mapState } from 'vuex';

module.exports = {
    state: {
        isMinimized: false,
        title: 'be easy',
    },
    mutations: {
        [types.WINDOW_SET_MINIMIZED] (state, isMinimized) {
            state.isMinimized = isMinimized;
        },
        [types.WINDOW_SET_TITLE] (state, title) {
            state.title = title;
        },
    },
};
