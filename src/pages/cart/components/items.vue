<style lang="scss" scoped>@import 'core';

</style>

<template>
    <div>
        Items
        <pre>{{ total }}</pre>
        <pre>{{ items }}</pre>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                total: 'SHOP_CART_TOTAL',
            }),
            items() {
                return this.$store.state.shop.cart.items;
            },
        },
    };
</script>
