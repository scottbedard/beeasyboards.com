<style lang="scss" scoped>@import 'core';

</style>

<template>
    <!-- Empty cart -->
    <v-empty v-if="isEmpty"></v-empty>

    <!-- Populated cart -->
    <v-page v-else>
        <h1>Cart</h1>
        <div class="grid padded">
            <div class="cell mobile-12 tablet-8">
                <v-items></v-items>
            </div>
            <div class="cell mobile-12 tablet-4">
                Right
            </div>
        </div>
    <v-page>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {};
        },
        components: {
            'v-empty': require('./empty'),
            'v-items': require('./components/items'),
        },
        computed: {
            ...mapGetters({
                isEmpty: 'SHOP_CART_IS_EMPTY',
            }),
        },
    };
</script>
