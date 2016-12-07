import * as types from '../types';
import Vue from 'vue';

module.exports = {
    state: {
        alerts: [],
    },
    mutations: {
        [types.ALERT_PUSH] (state, alert) {
            state.alerts.push(alert);
        },
        [types.ALERT_REMOVE] (state, alert) {
            let index = state.alerts.indexOf(alert);

            if (index > -1) {
                state.alerts.splice(index, 1);
            }
        },
    },
};
