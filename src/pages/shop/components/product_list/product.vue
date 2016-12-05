<style lang="scss" scoped>@import 'core';
    a {
        padding: 20px;
        text-align: center;

        .thumbnails {
            position: relative;
        }

        img {
            width: 100%;
            height: auto;
            @include transition(opacity, 0.4s);
        }

        img:nth-of-type(1) {
            opacity: 1;
        }

        img:nth-of-type(2) {
            left: 0;
            opacity: 0;
            position: absolute;
            top: 0;
        }

        &:hover {
            img:nth-of-type(1) { opacity: 0 }
            img:nth-of-type(2) { opacity: 1 }
        }
    }
</style>

<template>
    <router-link :to="{ name: 'shop-product', params: { slug: product.slug }}">
        <div class="thumbnails">
            <img v-if="firstThumbnail" :src="firstThumbnail.path" :alt="firstThumbnail.title">
            <img v-if="secondThumbnail" :src="secondThumbnail.path" :alt="secondThumbnail.title">
        </div>
        <div>{{ product.name }}</div>
        <v-price :base="product.base_price" :current="product.price"></v-price>
    </router-link>
</template>

<script>
    export default {
        components: {
            'v-price': require('../price'),
        },
        computed: {
            firstThumbnail() {
                if (this.product.thumbnails.length < 1) {
                    return false;
                }

                return this.product.thumbnails[0];
            },
            secondThumbnail() {
                if (this.product.thumbnails.length < 2) {
                    return false;
                }

                return this.product.thumbnails[1];
            },
        },
        props: [
            'product',
        ],
    };
</script>
