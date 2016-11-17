<style lang="scss" scoped>@import 'core';
    .v-header {
        background-color: $off-black;
        color: $off-white;
        @include bp-prop(height, 72px, 84px, 96px, 108px);
        @include transition(height);
    }

    .v-content {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: space-between;
    }
</style>

<template>
    <div class="v-header">
        <v-content>
            <v-logo></v-logo>
            <v-desktop-navigation><v-desktop-navigation>
        </v-content>
    </div>
</template>

<script>
    export default {
        components: {
            'v-desktop-navigation': require('./desktop_navigation'),
            'v-logo': require('./logo'),
        },
    };
</script>
