<style lang="scss" scoped>@import 'core';
    .price {
        font-size: 1.25em;
        font-weight: 300;
    }

    .added-to-cart {
        .message {
            font-weight: bold;
            margin-bottom: 24px;
        }

        span {
            margin-left: 4px;
        }
    }
</style>

<template>
    <v-404 v-if="product === null"></v-404>
    <v-page v-else class="grid padded">
        <div class="cell mobile-12 large-phone-8 tablet-9 images">
            <v-image-gallery :product="product"></v-image-gallery>
        </div>
        <div class="cell mobile-12 large-phone-4 tablet-3 details">
            <h1>{{ product.name }}</h1>
            <v-price class="price" :base="product.base_price" :current="product.price"></v-price>
            <div class="description" v-html="product.description_html" v-linkable></div>
            <transition name="fade" mode="out-in">
                <v-inventory-selector
                    v-if="! isAdded"
                    :product="product"
                    :is-loading="addToCartIsLoading"
                    @add="addToCart">
                </v-inventory-selector>
                <div v-else class="added-to-cart">
                    <div class="message">{{ product.name }} was added to your cart!</div>
                    <div>
                        <v-button route="/cart">View cart</v-button>
                        <span>or</span>
                        <a href="#" @click.prevent="onAddMoreClicked">add more</a>
                    </div>
                </div>
            </transition>
        </div>
    </v-page>
</template>

<script>
    import ShopRepository from 'src/repositories/shop';

    export default {
        beforeRouteEnter(to, from, next) {
            ShopRepository.getProduct(to.params.slug)
                .then(response => next(vm => vm.onFetchComplete(response)))
                .catch(error => next());
        },
        data() {
            return {
                addToCartIsLoading: false,
                isAdded: false,
                product: null,
            };
        },
        components: {
            'v-404': require('./404'),
            'v-image-gallery': require('src/components/shop/image_gallery'),
            'v-inventory-selector': require('src/components/shop/inventory_selector'),
            'v-price': require('src/components/shop/price'),
        },
        methods: {
            addToCart(inventory, quantity) {
                this.addToCartIsLoading = true;
                ShopRepository.addItem(inventory.id, quantity)
                    .then(this.onAddSucceeded)
                    .catch(this.onAddFailed)
                    .then(() => this.addToCartIsLoading = false);
            },
            onAddMoreClicked() {
                this.isAdded = false;
            },
            onAddSucceeded(response) {
                this.$store.commit('SHOP_CART_SET_ITEM', response.data);
                this.isAdded = true;
            },
            onAddFailed(error) {
                console.log ('failed');
                console.error(error);
            },
            onFetchComplete(response) {
                this.product = response.data;
                this.$setTitle(':product', { product: this.product.name });
            },
            onRouteChanged() {
                ShopRepository.getProduct(this.$route.params.slug)
                    .then(this.onFetchComplete)
                    .catch(error => this.product = null);
            },
        },
        watch: {
            '$route': 'onRouteChanged',
        },
    };
</script>
