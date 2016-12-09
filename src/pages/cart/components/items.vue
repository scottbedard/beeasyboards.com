<style lang="scss" scoped>@import 'core';
    .table {
        display: table;
        width: 100%;
    }

    .row {
        display: table-row;
    }

    .header-cell {
        display: table-cell;
        font-weight: bold;
    }

    .cell {
        display: table-cell;
        vertical-align: middle;
    }

    .item-flex {
        align-items: center;
        display: flex;
    }

    .thumbnail {
        img {
            width: auto;
            @include bp-prop(max-height, 100px);
        }
    }

    .product {
        .inventory {
            font-size: 12px;
        }
    }

    .quantity,
    .remove {
        text-align: center;
        width: 20%;
    }

    .quantity-mobile {
        @include bp-prop(display, inline, false, none);
    }

    .quantity-tablet {
        @include bp-prop(display, none, false, inline);
    }

    .remove {
        @include bp-prop(display, none, false, table-cell);
    }

    .mobile-remove {
        font-size: 12px;
        @include bp-prop(display, inline, false, none);
    }

    input {
        text-align: center;
    }
</style>

<template>
    <div class="v-cart">
        <div class="table">
            <div class="row">
                <div class="header-cell item">Item</div>
                <div class="header-cell quantity">
                    <span class="quantity-mobile">#</span>
                    <span class="quantity-tablet">Quantity</span>
                </div>
                <div class="header-cell remove">Remove</div>
            </div>
            <div class="row" v-for="item in items">
                <div class="cell item">
                    <div class="item-flex">
                        <div class="thumbnail">
                            <img
                                v-if="item.inventory.product.thumbnails.length"
                                :src="item.inventory.product.thumbnails[0].path"
                                :alt="item.inventory.product.thumbnails[0].title || item.inventory.product.name">
                        </div>
                        <div class="product">
                            <div class="name">
                                {{ item.inventory.product.name }}
                            </div>
                            <div
                                class="inventory"
                                v-if="item.inventory.option_values.length">
                                {{ inventoryString(item) }}
                            </div>
                            <a href="#" @click.prevent="removeItem(item)" class="mobile-remove">
                                <i class="fa fa-times"></i> Remove
                            </a>
                        </div>
                    </div>
                </div>
                <div class="cell quantity">
                    <input
                        class="form-control"
                        min="0"
                        type="number"
                        :max="item.inventory.quantity"
                        :value="item.quantity">
                </div>
                <a class="cell remove" href="#" @click.prevent="removeItem(item)">
                    Remove
                </a>
            </diV>
        </div>
    </div>
</template>

<script>
    import ShopRepository from 'src/repositories/shop';
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
            inventoryString(item) {
                return item.inventory.option_values
                    .map(value => value.name)
                    .join(', ');
            },
            removeItem(item) {
                ShopRepository.removeItem(item.inventory_id)
                    .then(response => this.onRemoveSuccess(response, item))
                    .catch(error => this.onRemoveFailed(error));
            },
            onRemoveFailed(error) {
                this.$alert('Whoa, something went wrong, please try again.', { type: 'error' });
            },
            onRemoveSuccess(response, item) {
                this.$store.commit('SHOP_CART_ITEM_REMOVED', item);
            },
        },
    };
</script>
