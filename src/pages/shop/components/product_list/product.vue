<style lang="scss" scoped>@import 'core';
    a {
        text-align: center;
        padding: 20px;
    }
</style>

<template>
    <router-link :to="{ name: 'shop-product', params: { slug: product.slug }}">
        <div>{{ product.name }}</div>
        <v-price :base="product.base_price" :current="product.price"></v-price>
    </router-link>
</template>

<script>
    export default {
        components: {
            'v-price': require('../price'),
        },
        props: [
            'product',
        ],
    };
</script>
