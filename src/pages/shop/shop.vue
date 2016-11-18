<template>
    <v-page>
        <v-category-navigation></v-category-navigation>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </v-page>
</template>

<script>
    export default {
        components: {
            'v-category-navigation': require('src/components/shop/category_navigation'),
        },
    };
</script>
