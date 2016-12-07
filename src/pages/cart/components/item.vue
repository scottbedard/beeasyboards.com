<style lang="scss" scoped>@import 'core';
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
    <div>
        <div class="cell product">
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
        <div class="cell quantity">
            <v-input :value="item.quantity" />
        </div>
        <div class="cell remove">
            <a href="#" @click="onRemoveClicked">
                Remove
            </a>
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
