<template>
    <v-page>
        <v-category-navigation></v-category-navigation>
        <div>
            <h1>{{ name }}</h1>
            <transition name="fade" mode="out-in">
                <div v-if="isEmpty">
                    Sorry homie, we're fresh out of goods in this category.
                </div>
                <v-product-list
                    v-else
                    :category="category"
                    :products="products">
                </v-product-list>
            </transition>
        </div>
    </v-page>
</template>

<script>
    import { mapState } from 'vuex';
    import ShopRepository from 'src/repositories/shop';

    export default {
        created() {
            this.fetchData();
        },
        data() {
            return {
                isLoading: false,
                products: [],
            };
        },
        components: {
            'v-category-navigation': require('src/components/shop/category_navigation'),
            'v-product-list': require('src/components/shop/product_list/list'),
        },
        computed: {
            ...mapState({
                category: state => state.shop.categories.find(category => category.slug === state.route.params.category),
                slug: state => state.route.params.category || 'featured',
            }),
            isEmpty() {
                return this.isLoading === false && this.products.length === 0;
            },
            name() {
                let category = this.category;

                return typeof category !== 'undefined' ? category.name : null;
            },
        },
        methods: {
            fetchData() {
                this.isLoading = true;
                ShopRepository.getCategoryProducts(this.slug)
                    .then(this.onFetchComplete)
                    .catch(this.onFetchFailed)
                    .then(() => this.isLoading = false);
            },
            onFetchComplete(response) {
                this.products = response.data;
                this.$setTitle(':category', { category: this.name });
            },
            onFetchFailed(error) {
                console.error(error);
            },
        },
        watch: {
            '$route': 'fetchData',
        },
    };
</script>
