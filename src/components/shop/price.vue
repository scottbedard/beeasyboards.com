<style lang="scss" scoped>@import 'core';
    .base-price {
        color: #999;
        text-decoration: line-through;

        + .current-price {
            color: $green;
        }
    }
</style>

<template>
    <div>
        <span v-if="isDiscounted" class="base-price">{{ formattedBasePrice }}</span>
        <span class="current-price">{{ formattedCurrentPrice }}</span>
    </div>
</template>

<script>
    export default {
        computed: {
            formattedBasePrice() {
                return this.format(this.base);
            },
            formattedCurrentPrice() {
                return this.format(this.current);
            },
            isDiscounted() {
                return this.current < this.base;
            },
        },
        methods: {
            format(price) {
                return '$' + String(price).replace('.00', '');
            },
        },
        props: [
            'base',
            'current',
        ],
    };
</script>
