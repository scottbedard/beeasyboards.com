<template>
    <v-page>
        <v-category-navigation></v-category-navigation>
        <router-view></router-view>
    </v-page>
</template>

<script>
    export default {
        components: {
            'v-category-navigation': require('./category_navigation'),
        },
    };
</script>
