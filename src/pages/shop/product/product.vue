<style lang="scss" scoped>@import 'core';

</style>

<template>
    <v-404 v-if="product === null"></v-404>
    <v-page v-else class="grid">
        <div class="cell mobile-12 tablet-9 images">
            <pre>{{ product }}</pre>
        </div>
        <div class="cell mobile-12 tablet-3 details">
            <h1>{{ product.name }}</h1>
            <v-price class="price" :base="product.base_price" :current="product.price"></v-price>
            <div class="description" v-html="product.description_html" v-linkable></div>
            <v-inventory-selector :product="product"></v-inventory-selector>
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
                product: null,
            };
        },
        components: {
            'v-404': require('./404'),
            'v-inventory-selector': require('src/components/shop/inventory_selector'),
            'v-price': require('src/components/shop/price'),
        },
        methods: {
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
