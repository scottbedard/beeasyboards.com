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
        components: {
            'v-empty': require('./empty'),
            'v-items': require('./components/items'),
            // 'v-login': require('./components/login'),
            'v-summary': require('./components/summary'),
        },
        computed: mapGetters({
            isEmpty: 'SHOP_CART_IS_EMPTY',
        }),
    };
</script>
