<style lang="scss" scoped>@import 'core';
    .v-checkout {
        width: 100%;
    }
</style>

<style lang="scss">@import 'core';
    .v-checkout {
        h2 {
            margin: 0 0 20px;
        }
    }
</style>

<template>
    <div class="v-checkout">
        <v-address></v-address>
    </div>
</template>

<script>
    export default {
        components: {
            'v-address': require('./address'),
        },
    };
</script>
