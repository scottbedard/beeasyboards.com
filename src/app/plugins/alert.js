import Vue from 'vue';

Vue.use({
    install() {
        Vue.prototype.$alert = this.alert;
    },
    alert(content, options = {}) {
        // set up our default options
        if (typeof options.type === 'undefined') options.type = 'info';
        if (typeof options.timeout === 'undefined') options.timeout = 5000;

        // dispatch our alert
        let alert = { content, options };
        this.$store.commit('ALERT_PUSH', alert);

        // remove the alert when it times out
        if (options.timeout) {
            setTimeout(() => this.$store.commit('ALERT_REMOVE', alert), options.timeout);
        }
    },
});
