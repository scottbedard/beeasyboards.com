<style lang="scss" scoped>@import 'core';
    .cell {
        @include bp(tablet) {
            display: table-cell;
        }
    }
</style>

<template>
    <div>
        <div class="cell">{{ product.name }}</div>
        <div class="cell">
            <v-input :value="item.quantity" />
        </div>
        <div class="cell">
            <a href="#" @click="onRemoveClicked">
                Remove
            </a>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';

    export default {
        computed: {
            inventory() {
                return this.item.inventory;
            },
            product() {
                return this.item.inventory.product;
            },
        },
        methods: {
            onRemoveClicked() {
                this.$emit('remove', this.item);
            },
        },
        props: [
            'item',
        ],
    };
</script>
