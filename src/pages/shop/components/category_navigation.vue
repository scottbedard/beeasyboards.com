<style lang="scss" scoped>@import 'core';
    select {
        padding: 10px 20px;
        width: 100%;
        @include bp(tablet) { display: none }
    }

    .full-navigation {
        display: none;

        @include bp(tablet) {
            display: flex;
            justify-content: space-around;
            padding: 20px 0;
        }
    }
</style>

<template>
    <div>
        <!-- Mobile -->
        <select @change="onCategoryChanged" v-model="slug">
            <option value="" disabled>Select category</option>
            <option v-for="category in categories" :value="category.slug">
                {{ category.name }}
            </option>
        </select>

        <!-- Tablet -->
        <div class="full-navigation">
            <router-link v-for="category in categories" :to="{
                name: 'shop-category',
                params: {
                    category: category.slug,
                },
            }">
                {{ category.name }}
            </router-link>
        </div>
    </div>
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
                slug: '',
            };
        },
        computed: mapState({
            categories: state => state.shop.categories,
        }),
        methods: {
            fetchData() {
                ShopRepository.getCategories()
                    .then(this.onFetchComplete)
                    .catch(this.onFetchFailed);
            },
            onCategoryChanged() {
                let category = this.slug;
                this.$router.push({ name: 'shop-category', params: { category }});
            },
            onFetchComplete(response) {
                this.$store.commit('SHOP_SET_CATEGORIES', response.data);
            },
            onFetchFailed(error) {
                console.log ('error', error);
            },
        },
        watch: {
            '$route': 'fetchData',
        },
    };
</script>
