<style lang="scss" scoped>@import 'core';

</style>

<template>
    <div>
        Items
        <pre>{{ items }}</pre>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';

    export default {
        computed: {
            items() {
                return this.$store.state.shop.cart.items;
            },
        },
    };
</script>
