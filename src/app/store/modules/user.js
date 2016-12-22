import * as types from '../types';
import Vue from 'vue';

module.exports = {
    state: {
        user: null,
    },
    getters: {
        [types.USER_IS_LOGGED_IN]: state => state.user !== null,
        [types.USER_FIRST_NAME]: (state, getters) => {
            return getters.USER_IS_LOGGED_IN
                ? state.user.name.split(' ')[0]
                : null;
        },
    },
    mutations: {
        [types.USER_INITIALIZE] (state, user) {
            state.user = user;
        },
        [types.USER_LOGOUT] (state) {
            state.user = null;
        },
    },
};
