<style lang="scss" scoped>@import 'core';
    .v-button-spinner {
        margin-right: 6px;
        transform: translateY(2px);
    }
</style>

<template>
    <v-spinner
        class="v-button-spinner"
        size="17"
        :color="color">
    </v-spinner>
</template>

<script>
    export default {
        props: {
            color: { type: String, default: '#ddd' },
        },
    };
</script>
