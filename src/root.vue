<style lang="scss">
    @import 'global';
</style>

<template>
    <div>
        <v-header></v-header>
        <v-navigation-mobile></v-navigation-mobile>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <v-alert></v-alert>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        created() {
            this.storeInitialData();
            this.watchWindowVisibility();
        },
        components: {
            'v-alert': require('src/components/layout/alert'),
            'v-header': require('src/components/layout/header'),
            'v-navigation-mobile': require('src/components/layout/navigation/mobile'),
        },
        computed: mapState({
            isMinimized: state => state.window.isMinimized,
            title: state => state.window.title,
        }),
        methods: {
            onIsMinimizedChanged(isMinimized) {
                document.title = isMinimized
                    ? 'we miss you =('
                    : this.$store.state.window.title;
            },
            onTitleChanged(title) {
                document.title = title;
            },
            storeInitialData() {
                this.$store.commit('SHOP_INITIALIZE_CART', BeEasyData.cart);
            },
            watchWindowVisibility() {
                document.addEventListener('visibilitychange', () => {
                    this.$store.commit('WINDOW_SET_MINIMIZED', document.hidden);
                });
            },
        },
        watch: {
            isMinimized: 'onIsMinimizedChanged',
            title: 'onTitleChanged',
        },
    };
</script>
