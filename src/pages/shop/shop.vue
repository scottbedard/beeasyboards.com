<template>
    <v-page>
        <v-category-navigation></v-category-navigation>
        <router-view></router-view>
    </v-page>
</template>

<script>
    import ShopRepository from 'src/repositories/shop';

    import { mapState } from 'vuex';

    export default {
        created() {
            this.fetchData();
        },
        components: {
            'v-category-navigation': require('./category_navigation'),
        },
        methods: {
            fetchData() {
                ShopRepository.getCategories().then(this.onFetchComplete).catch(this.onFetchFailed);
            },
            onFetchComplete(response) {
                this.$store.commit('SHOP_SET_CATEGORIES', JSON.parse(response.body));
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
