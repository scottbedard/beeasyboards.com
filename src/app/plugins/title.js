import Vue from 'vue';

Vue.use({
    install() {
        Vue.prototype.$setTitle = this.setTitle;
    },
    setTitle(subtitle = '', values = {}) {
        let title = subtitle
            ? `be easy - ${ subtitle.toLowerCase() }`
            : 'be easy';

        Object.keys(values).forEach(key => {
            let placeholders = new RegExp(`:${ key }`, 'g');
            title = title.replace(placeholders, values[key]);
        });

        this.$store.commit('WINDOW_SET_TITLE', title.trim().toLowerCase());
    },
});
