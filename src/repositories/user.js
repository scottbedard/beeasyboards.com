import Vue from 'vue';

export default {
    logout() {
        return Vue.http.get('/api/bedard/socialite/logout');
    },
};
