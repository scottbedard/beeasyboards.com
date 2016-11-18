<style lang="scss" scoped>@import 'core';
    select {
        padding: 10px 20px;
        width: 100%;
    }
</style>

<template>
    <div>
        <select @change="onCategoryChanged">
            <option v-for="category in categories">
                {{ category.name }}
            </option>
        </select>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState({
            categories: state => state.shop.categories,
        }),
        methods: {
            onCategoryChanged() {
                // nav
            },
        },
    };
</script>
