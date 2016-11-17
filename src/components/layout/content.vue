<style lang="scss" scoped>@import 'core';
    .v-content {
        max-width: $content-max-width;
        margin: 0 auto;
        width: 100%;
        @include bp-prop(padding, 0 $content-margins-mobile, false, 0 $content-margins-tablet);
        @include transition(padding);
    }
</style>

<template>
    <div class="v-content">
        <slot></slot>
    </div>
</template>
