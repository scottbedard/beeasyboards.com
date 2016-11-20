<style lang="scss" scoped>@import 'core';
    .transition-group {
        display: flex;
        flex-wrap: wrap;
    }

    .v-product {
        flex-basis: auto;
        @include bp-prop(width, 50%, 33.3333%, 25%);

        @include bp(desktop) {
            @for $i from 1 through 12 {
                &.columns-#{ $i } { width: 100% / $i }
            }
        }
    }
</style>

<template>
    <div>
        <transition-group name="fade" mode="out-in" tag="div" class="transition-group">
            <v-product
                v-for="product in products"
                class="v-product"
                :key="product.id"
                :class="[columnsClass]"
                :product="product">
            </v-product>
        </transition-group>
    </div>
</template>

<script>
    export default {
        components: {
            'v-product': require('./product'),
        },
        computed: {
            columnsClass() {
                return typeof this.category !== 'undefined'
                    ? `columns-${ this.category.product_columns }`
                    : 'columns-1';
            },
        },
        props: [
            'category',
            'products',
        ],
    };
</script>
