<style lang="scss">
    @import 'global';
</style>

<template>
    <div>
        <v-header></v-header>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        components: {
            'v-header': require('src/components/layout/header'),
        },
    };
</script>
