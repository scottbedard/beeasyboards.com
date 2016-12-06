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
                :item="item"
                @remove="onRemoveItem">
            </v-item>
        </div>
    </div>
</template>

<script>
    import ShopRepository from 'src/repositories/shop';
    import { mapGetters, mapState } from 'vuex';

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
            onRemoveItem(item) {
                ShopRepository.removeItem(item.inventory_id)
                    .then(response => this.onItemRemoveSuccess(response, item))
                    .catch(this.onItemRemoveFailed);
            },
            onItemRemoveFailed(error) {
                console.error(error);
            },
            onItemRemoveSuccess(response, item) {
                this.$store.commit('SHOP_CART_ITEM_REMOVED', item);
            },
        },
    };
</script>
