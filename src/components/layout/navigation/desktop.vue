<style lang="scss" scoped>@import 'core';
    div {
        height: 100%;
    }

    a {
        align-items: center;
        color: $off-white;
        display: inline-flex;
        height: 100%;
        padding: 10px 20px;
        text-decoration: none;
        @include transition('background-color, color');

        &:hover,
        &.router-link-active {
            background-color: lighten($off-black, 5%);
            color: lighten($off-white, 5%);
        }
    }
</style>

<template>
    <div>
        <router-link v-for="link in navigation" :to="link.route">
            <span v-if="link.isCart">{{ link.name }} ({{ cartItems }})</span>
            <span v-else>{{ link.name }}</span>
        </router-link>
    </div>
</template>

<script>
    import Navigation from 'src/app/navigation';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                cartItems: 'SHOP_CART_ITEM_COUNT',
            }),
            navigation() {
                return Navigation;
            },
        },
    };
</script>
