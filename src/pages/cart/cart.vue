<style lang="scss" scoped>@import 'core';

</style>

<template>
    <v-page>
        <h1>Cart</h1>
        <div class="grid padded">
            <div class="cell mobile-12 tablet-8">
                <v-items></v-items>
            </div>
            <div class="cell mobile-12 tablet-4">
                Right
            </div>
        </div>
    <v-page>
</template>

<script>


    export default {
        data() {
            return {};
        },
        components: {
            'v-items': require('./components/items'),
        },
        computed: {

        },
    };
</script>
