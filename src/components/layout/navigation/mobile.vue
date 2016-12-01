<style lang="scss" scoped>@import 'core';
    .navigation-content {
        background-color: $off-white;
        box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.45);
        height: 100%;
        left: 0;
        max-width: 320px;
        position: fixed;
        top: 0;
        transform: translateX(-100%);
        width: 75%;
        z-index: z(mobile-navigation, content);
        @include transition(transform);
    }

    .backdrop {
        background-color: rgba(0, 0, 0, 0.8);
        bottom: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        right: 0;
        top: 0;
        z-index: z(mobile-navigation, backdrop);
        @include transition(opacity);
    }

    .is-visible {
        .backdrop { opacity: 1 }
        .navigation-content { transform: translateX(0%) }
    }

    .routes {
        padding: 10px 0;

        a {
            color: $off-black;
            display: block;
            font-size: 24px;
            font-weight: 300;
            height: 60px;
            line-height: 60px;
            text-decoration: none;
            padding: 0 20px;
        }
    }
</style>

<template>
    <div class="v-navigation-mobile" :class="{ 'is-visible': isVisible }">
        <div class="backdrop"></div>
        <div class="navigation-content">
            <div class="routes">
                <router-link v-for="link in navigation" :to="link.route">
                    <span v-if="link.isCart">{{ link.name }} ({{ cartItems }})</span>
                    <span v-else>{{ link.name }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Navigation from 'src/app/navigation';
    import debounce from 'debounce';
    import { mapGetters, mapState } from 'vuex';

    export default {
        created() {
            window.onresize = debounce(this.onWindowResized, 200);
        },
        computed: {
            ...mapGetters({
                cartItems: 'SHOP_CART_ITEMS',
            }),
            ...mapState({
                isVisible: state => state.navigation.isExpanded,
            }),
            navigation: () => Navigation,
        },
        methods: {
            onBodyClicked(e) {
                // hide the nav if the click did not pass through our element
                let path = e.path || (e.composedPath && e.composedPath());

                if (! path.find(el => el === this.$el)) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.$store.commit('NAVIGATION_HIDE');
                }
            },
            onIsVisbleChanged(isVisible) {
                let action = isVisible ? 'addEventListener' : 'removeEventListener';
                document[action]('click', this.onBodyClicked, true);
            },
            onRouteChanged() {
                this.$store.commit('NAVIGATION_HIDE');
            },
            onWindowResized() {
                this.$store.commit('NAVIGATION_HIDE');
            },
        },
        watch: {
            isVisible: 'onIsVisbleChanged',
            '$store.state.route': 'onRouteChanged',
        },
    };
</script>
