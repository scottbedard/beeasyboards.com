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
        currentPage: {{ currentPage }}
        <transition-group name="fade" mode="out-in" tag="div" class="transition-group">
            <v-product
                v-for="product in productsOnCurrentPage"
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
            cols() {
                return typeof this.category !== 'undefined'
                    ? this.category.product_columns
                    : 3;
            },
            columnsClass() {
                return typeof this.category !== 'undefined'
                    ? `columns-${ this.category.product_columns }`
                    : 'columns-1';
            },
            currentPage() {
                let page = this.$route.query.page || 1;

                return Number(page);
            },
            rows() {
                return typeof this.category !== 'undefined'
                    ? this.category.product_rows
                    : 3;
            },
            productsOnCurrentPage() {
                let start = this.productsPerPage * (this.currentPage - 1);
                let end = start + (this.productsPerPage || this.category.products_count);

                return this.products.slice(start, end);
            },
            productsPerPage() {
                return this.cols * this.rows;
            },
        },
        props: [
            'category',
            'products',
        ],
    };
</script>
