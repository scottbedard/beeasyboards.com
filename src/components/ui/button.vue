<style lang="scss" scoped>@import 'core';
    a,
    button {
        // @todo
    }
</style>

<script>
    export default {
        render(h) {
            if (this.href !== null) return this.renderAnchor(h);
            if (this.route !== null) return this.renderRouterLink(h);
            else return this.renderButton(h);
        },
        methods: {
            emit() {
                return this.$emit.bind(this, ...arguments);
            },
            renderAnchor(h) {
                return <a href={ this.href } class={ this.buttonClasses } on-click={ this.emit('click') }>
                    { this.$slots.default }
                </a>;
            },
            renderButton(h) {
                return <button on-click={ this.emit('click') }>
                    { this.$slots.default }
                </button>;
            },
            renderRouterLink(h) {
                return <router-link to={ this.route }>
                    { this.$slots.default }
                </router-link>;
            },
        },
        props: {
            href: { default: null },
            route: { default: null },
        },
    };
</script>
