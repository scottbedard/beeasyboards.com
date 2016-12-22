<style lang="scss" scoped>@import 'core';

</style>

<template>
    <!-- Empty cart -->
    <v-empty v-if="isEmpty"></v-empty>

    <!-- Populated cart -->
    <v-page v-else>
        <div class="grid padded">
            <div class="cell mobile-12 tablet-8 desktop-9">
                <h2>Your shopping cart</h2>
                <v-items></v-items>
            </div>
            <div class="cell mobile-12 tablet-4 desktop-3">
                <h2>Summary</h2>
                <v-summary></v-summary>
            </div>
        </div>
    <v-page>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        created() {
            this.cleanUrlHash();
        },
        components: {
            'v-empty': require('./empty'),
            'v-items': require('./components/items'),
            'v-summary': require('./components/summary'),
        },
        computed: mapGetters({
            isEmpty: 'SHOP_CART_IS_EMPTY',
        }),
        methods: {
            cleanUrlHash() {
                // clean up the #_=_ appended to the url by facebook
                if (window.location.hash && window.location.hash == '#_=_') {
                    if (window.history && history.pushState) {
                        window.history.pushState('', document.title, window.location.pathname);
                    } else {
                        let { scrollTop, scrollLeft } = document.body;
                        window.location.hash = '';
                        document.body.scrollTop = scrollTop;
                        document.body.scrollLeft = scrollLeft;
                    }
                }
            },
        },
    };
</script>
