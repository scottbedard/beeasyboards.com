<style lang="scss" scoped>@import 'core';
    .v-header {
        background-color: $off-black;
        color: $off-white;
        position: relative;
        @include bp-prop(height, 72px, 84px, 96px, 108px);
        @include transition(height);
    }

    .v-content {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: space-between;
    }

    .v-navigation-desktop {
        @include bp-prop(display, none, false, block);
    }

    .v-navigation-hamburger {
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        
        @include bp(tablet) { display: none }
    }
</style>

<template>
    <div class="v-header">
        <v-content>
            <v-logo></v-logo>
            <v-navigation-desktop class="v-navigation-desktop"><v-navigation-desktop>
        </v-content>
        <v-navigation-hamburger class="v-navigation-hamburger"></v-navigation-hamburger>
    </div>
</template>

<script>
    export default {
        components: {
            'v-navigation-hamburger': require('./navigation/hamburger'),
            'v-navigation-desktop': require('./navigation/desktop'),
            'v-logo': require('./logo'),
        },
    };
</script>
