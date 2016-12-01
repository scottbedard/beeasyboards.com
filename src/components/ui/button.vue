<style lang="scss" scoped>@import 'core';
    a,
    button {
        border: 1px solid transparent;
        border-radius: 3px;
        background-color: lighten($off-black, 5%);
        color: $off-white;
        outline: none;
        padding: 10px 20px;
        text-decoration: none;
        @include transition(background-color);

        &:active {
            &:not(:disabled) {
                transform: translateY(1px);
            }
        }

        &:hover {
            background-color: $off-black;
            color: lighten($off-white, 2%);
            text-decoration: none;
        }

        &:disabled {
            background-color: lighten($off-black, 50%);
        }
    }

    .outlined {
        $color: lighten($off-black, 15%);
        background-color: transparent;
        border: 1px solid $color;
        color: $color;

        &:hover {
            background-color: transparent;
            border-color: $off-black;
            color: $off-black;
        }
    }
</style>

<template>
    <!-- Anchor -->
    <a v-if="href" :href="href" @click="$emit('click')">
        <slot></slot>
    </a>

    <!-- Router link -->
    <router-link v-else-if="route" :to="route">
        <slot></slot>
    </router-link>

    <!-- Button -->
    <button
        v-else
        :disabled="disabled"
        @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            disabled: { type: Boolean, default: false },
            href: { default: null },
            route: { default: null },
        },
    };
</script>
