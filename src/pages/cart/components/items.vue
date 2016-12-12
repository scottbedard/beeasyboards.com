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
        .remove {
            color: #666;
            font-size: .8em;
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
            color: #666;
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
                <v-select :clearable="false">
                    <option v-for="n in inventory.quantity" :value="n">{{ n }}</option>
                </v-select>
            </div>
            <div class="price">
                <div>{{ itemTotal(item) }}</div>
                <div class="unit-price" v-if="item.quantity > 1">
                    {{ product.price }} / each
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        },
    };
</script>
