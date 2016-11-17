<style lang="scss" scoped>@import 'core';
    a,
    button {
        border: 1px solid transparent;
        border-radius: 3px;
        background-color: lighten($off-black, 5%);
        color: $off-white;
        outline: none;
        padding: 10px 20px;
        text-decoration: none;
        @include transition(background-color);

        &:active {
            transform: translateY(1px);
        }

        &:hover {
            background-color: $off-black;
        }
    }

    .outlined {
        $color: lighten($off-black, 15%);
        background-color: transparent;
        border: 1px solid $color;
        color: $color;

        &:hover {
            background-color: transparent;
            border-color: $off-black;
            color: $off-black;
        }
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
                return <a href={ this.href } on-click={ this.emit('click') }>
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
