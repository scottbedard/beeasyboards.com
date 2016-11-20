<style lang="scss" scoped>@import 'core';

</style>

<template>
    <div class="grid">
        <div class="cell mobile-12 tablet-8 images">
            product images
        </div>
        <div class="cell mobile-12 tablet-4 details">
            <h1>{{ product.name }}</h1>
            <v-price class="price" :base="product.base_price" :current="product.price"></v-price>
            <div class="description" v-html="product.description_html" v-linkable></div>
            <v-inventory-selector :product="product"></v-inventory-selector>
        </div>
    </div>
</template>

<script>
    import ShopRepository from 'src/repositories/shop';

    export default {
        beforeRouteEnter(to, from, next) {
            ShopRepository.getProduct(to.params.slug)
                .then(response => next(vm => vm.product = JSON.parse(response.data)))
                .catch(error => {
                    // @todo: redirect to error page
                });
        },
        data() {
            return {
                product: {},
            };
        },
        components: {
            'v-inventory-selector': require('src/components/shop/inventory_selector/inventory_selector'),
            'v-price': require('src/components/shop/price'),
        },
        methods: {
            onRouteChanged() {
                this.product = {};
                ShopRepository.getProduct(this.$route.params.slug)
                    .then(response => this.product = JSON.parse(response.data))
                    .catch(error => {
                        // @todo: redirect to error page
                    });
            },
        },
        watch: {
            '$route': 'onRouteChanged',
        },
    };
</script>
