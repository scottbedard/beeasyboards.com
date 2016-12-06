<style lang="scss" scoped>@import 'core';
    div {
        text-align: center;
    }

    a {
        $size: 30px;
        $inactiveColor: #aaa;
        align-items: center;
        border-radius: 3px;
        border: 1px solid $inactiveColor;
        color: $inactiveColor;
        display: inline-block;
        display: inline-flex;
        height: $size;
        justify-content: center;
        margin: 0 6px;
        width: $size;
        @include transition('border-color, color');

        &:hover,
        &.is-active {
            $activeColor: #333;
            border-color: $activeColor;
            color: $activeColor;
            text-decoration: none;
        }
    }
</style>

<template>
    <div>
        <router-link v-for="page in pages"
            :class="{ 'is-active': currentPage == page }"
            :to="{
                name: 'shop-category',
                query: { page },
                params: { category: category.slug },
            }">
            {{ page }}
        </router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: this.$route.query.page || 1,
            };
        },
        computed: {
            pages() {
                let pages = [];

                for (let i = 1; i <= this.lastPage; i++) {
                    pages.push(i);
                }

                return pages;
            },
        },
        methods: {
            onRouteChanged() {
                this.currentPage = this.$route.query.page || 1;
            },
        },
        props: [
            'category',
            'productsPerPage',
            'totalProducts',
            'lastPage',
        ],
        watch: {
            '$route': 'onRouteChanged',
        },
    };
</script>
