<style lang="scss" scoped>@import 'core';
    //
    // Rows
    //
    .header {
        border-bottom: 1px solid #ddd;
        padding-bottom: 20px;
    }

    .row {
        display: flex;

        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    //
    // Thumbnail
    //
    .thumbnail {
        padding-right: 20px;
        @include bp-prop(width, 95px, 110px, 125px);
        @include transition(width);

        img {
            height: auto;
            width: 100%;
        }
    }


    //
    // Product
    //
    .product {
        flex-grow: 1;

        .options,
        .mobile-price,
        .remove {
            color: #666;
            font-size: .8em;
        }

        .mobile-price {
            @include bp-prop(display, block, false, none);
            .unit-price { font-size: .75em }
        }

        .remove:hover { color: #000 }
    }

    //
    // Quantity
    //
    .quantity {
        text-align: center;
        @include bp-prop(width, 20%, false, 10%);

        .mobile-quantity { @include bp-prop(display, inline, none) }
        .large-phone-quantity { @include bp-prop(display, none, inline) }
    }

    //
    // Price
    //
    .price {
        margin-left: 20px;
        text-align: center;
        width: 10%;
        @include bp-prop(display, none, false, block);

        .unit-price {
            font-size: 12px;
            font-weight: 300;
        }
    }
</style>

<template>
    <div class="v-items">
        <div class="header row">
            <div class="thumbnail"></div>
            <div class="product">Product</div>
            <div class="quantity">
                <span class="mobile-quantity">#</span>
                <span class="large-phone-quantity">Quantity</span>
            </div>
            <div class="price">Price</div>
        </div>
        <div v-for="{ item, inventory, product, thumbnails } in items" class="row">
            <router-link class="thumbnail" :to="{ name: 'shop-product', params: { slug: product.slug }}">
                <img
                    v-if="thumbnails.length"
                    :src="thumbnails[0].path"
                    :alt="thumbnails[0].title || product.name">
            </router-link>
            <div class="product">
                <router-link class="thumbnail" :to="{ name: 'shop-product', params: { slug: product.slug }}">
                    {{ product.name }}
                </router-link>
                <div class="mobile-price">
                    <span>Price: {{ itemTotal(item) | money }}</span>
                    <span class="unit-price" v-if="item.quantity > 1">
                        ({{ product.price | money }}/ea)
                    </span>
                </div>
                <div class="options">
                    <div class="option" v-for="value in inventory.option_values">
                        {{ value.option.name }}: {{ value.name }}
                    </div>
                </div>
                <a href="#" @click.prevent="removeItem(item)" class="remove">
                    Remove
                </a>
            </div>
            <div class="quantity">
                <v-select
                    :clearable="false"
                    :selected="item.quantity"
                    @change="value => updateQuantity(item, Number(value))">
                    <option v-for="n in inventory.quantity" :value="n">{{ n }}</option>
                </v-select>
            </div>
            <div class="price">
                <div>{{ itemTotal(item) | money }}</div>
                <div class="unit-price" v-if="item.quantity > 1">
                    {{ product.price | money }} each
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ShopRepository from 'src/repositories/shop';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                total: 'SHOP_CART_TOTAL',
            }),
            items() {
                return this.$store.state.shop.cart.items.map(item => ({
                    item,
                    inventory: item.inventory,
                    product: item.inventory.product,
                    thumbnails: item.inventory.product.thumbnails,
                }));
            },
        },
        methods: {
            itemTotal(item) {
                return item.quantity * item.inventory.product.price;
            },
            onItemRemoved(item) {
                this.$store.commit('SHOP_CART_ITEM_REMOVED', item);
            },
            onItemRemoveFailed() {
                let error = 'Damn, something went wrong and that item wasn\'t removed.';

                this.$alert(error, { type: 'error' });
            },
            onItemUpdated(response) {
                this.$store.commit('SHOP_CART_SET_ITEM', response.data);
            },
            onItemUpdateFailed() {
                let error = 'An error occured and we weren\'t able to update that item.';

                this.$alert(error, { type: 'error' });
            },
            removeItem(item) {
                ShopRepository.removeItem(item.inventory_id)
                    .then(response => this.onItemRemoved(item))
                    .catch(this.onItemRemoveFailed);
            },
            updateQuantity(item, quantity) {
                ShopRepository.updateQuantity(item.id, quantity)
                    .then(this.onItemUpdated)
                    .catch(this.onItemUpdateFailed);
            },
        },
    };
</script>
