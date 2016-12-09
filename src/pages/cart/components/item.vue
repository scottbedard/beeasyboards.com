<style lang="scss" scoped>@import 'core';
    .row {
        @include bp(tablet) {
            display: table-row;
        }
    }

    .cell {
        @include bp(tablet) {
            display: table-cell;
            &.quantity, &.remove {
                text-align: center;
            }
        }

        .product-flex {
            align-items: center;
            display: flex;
            border: 1px solid blue;
        }

        .cell-flex {
            align-items: center;
            display: flex;
            border: 1px solid blue;
        }
    }

    .thumbnail {
        display: inline-block;

        img {
            max-width: 100px;
            height: auto;
        }
    }

    .details {
        display: inline-block;
    }
</style>

<template>
    <div class="row">
        <div class="cell product">
            <div class="product-flex">
                <div class="thumbnail">
                    <img
                        v-if="thumbnail"
                        :src="thumbnail.path"
                        :alt="thumbnail.title || product.name" />
                </div>
                <div class="details">
                    <div class="product-name">{{ product.name }}</div>
                </div>
            </div>
        </div>
        <div class="cell quantity">
            <div class="cell-flex">
                <input :value="item.quantity" min="0" :max="inventory.quantity" type="number" />
            </div>
        </div>
        <div class="cell remove">
            <div class="cell-flex">
                <a href="#" @click.prevent="onRemoveClicked">
                    Remove
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import ShopRepository from 'src/repositories/shop';
    // import { mapGetters, mapState } from 'vuex';

    export default {
        computed: {
            inventory() {
                return this.item.inventory;
            },
            product() {
                return this.inventory.product;
            },
            thumbnail() {
                return this.product.thumbnails.length > 0
                    ? this.product.thumbnails[0]
                    : false;
            },
        },
        methods: {
            onRemoveClicked() {
                ShopRepository.removeItem(this.item.inventory_id)
                    .then(this.onRemoveSuccess)
                    .catch(this.onRemoveFailed);
            },
            onRemoveFailed(error) {
                let errorMessage = 'Whoa, something went wrong, please try again.';

                this.$alert(errorMessage, { type: 'error' });
            },
            onRemoveSuccess(response) {
                this.$store.commit('SHOP_CART_ITEM_REMOVED', this.item);
            },
        },
        props: [
            'item',
        ],
    };
</script>
