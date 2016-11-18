<template>
    <div>
        <v-content>
            <h1>Shop</h1>
        </v-content>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        created() {
            this.fetchData();
        },
        computed: {
            ...mapState({
                slug: state => state.route.params.category || 'featured',
            }),
        },
        methods: {
            fetchData() {
                console.log (this.slug);
            },
        },
        watch: {
            '$route': 'fetchData',
        },
    };
</script>
