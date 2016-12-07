<style lang="scss" scoped>@import 'core';
    .table {
        width: 100%;

        @include bp(tablet) {
            display: table;
        }
    }

    .row {
        @include bp(tablet) {
            display: table-row;
        }
    }

    .header-cell {
        @include bp(tablet) {
            display: table-cell;
        }
    }
</style>

<template>
    <div>
        <div class="table">
            <div class="row">
                <div class="header-cell">Item</div>
                <div class="header-cell">Quantity</div>
                <div class="header-cell">Remove</div>
            </div>
            <v-item
                class="row"
                v-for="item in items"
                :item="item">
            </v-item>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        components: {
            'v-item': require('./item'),
        },
        computed: {
            ...mapGetters({
                total: 'SHOP_CART_TOTAL',
            }),
            items() {
                return this.$store.state.shop.cart.items;
            },
        },
        methods: {

        },
    };
</script>
