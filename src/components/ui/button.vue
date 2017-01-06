<style lang="scss" scoped>@import 'core';
    a,
    button {
        border: 1px solid transparent;
        border-radius: 3px;
        color: #fff;
        outline: none;
        padding: 10px 20px;
        text-decoration: none;
        @include transition(background-color);

        &:active {
            &:not(:disabled) {
                transform: translateY(1px);
            }
        }

        &:not(.outlined):not(:disabled) {
            &:hover {
                text-decoration: none;
            }

            @each $name, $color in $colors {
                &.background-#{ $name }:hover {
                    background-color: darken($color, 5%);
                }
            }
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
            background-color: lighten($off-black, 5%);
            border-color: lighten($off-black, 5%);
            color: #fff;
        }
    }

    //
    // Icons
    //
    i.fa {
        padding: 0 5px;
        &:first-child { padding-left: 0 }
        &:last-child { padding-right: 0 }
    }
</style>

<template>
    <!-- Anchor -->
    <a
        v-if="href"
        class="v-button"
        :class="[ `background-${ color }` ]"
        :href="href"
        @click="$emit('click')">
        <slot></slot>
    </a>

    <!-- Router link -->
    <router-link
        v-else-if="route"
        class="v-button"
        :class="[ `background-${ color }` ]"
        :to="route">
        <slot></slot>
    </router-link>

    <!-- Button -->
    <button
        v-else
        class="v-button"
        :class="[ `background-${ color }` ]"
        :disabled="disabled"
        @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            color: { type: String, default: 'off-black' },
            disabled: { type: Boolean, default: false },
            href: { default: null },
            route: { default: null },
        },
    };
</script>
