<style lang="scss" scoped>@import 'core';
    img {
        width: auto;
        @include bp-prop(height, 36px, 48px, 60px);
        @include transition(height);
    }
</style>

<template>
    <router-link to="/">
        <img src="../../assets/logo.png" alt="Be Easy">
    </router-link>
</template>
