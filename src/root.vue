<style lang="scss">
    @import 'global';
</style>

<template>
    <div>
        <v-header></v-header>
        <v-navigation-mobile></v-navigation-mobile>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        components: {
            'v-header': require('src/components/layout/header'),
            'v-navigation-mobile': require('src/components/layout/navigation/mobile'),
        },
    };
</script>
