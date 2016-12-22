<style lang="scss" scoped>@import 'core';
    .row {
        display: flex;
        justify-content: space-between;

        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    .checkout {
        .v-button { width: 100% }
    }
</style>

<template>
    <div>
        <div class="row">
            <span>Subtotal</span>
            <span>{{ subtotal | money }}</span>
        </div>
        <div class="row">
            <span>Promo code</span>
            <span>None</span>
        </div>
        <div class="row">
            <span>Shipping</span>
            <span>Not calculated yet</span>
        </div>
        <div class="row">
            <span>Total</span>
            <span>{{ total | money }}</span>
        </div>
        <div class="row">
            <v-login></v-login>
        </div>
        <div class="row checkout">
            <v-button class="outlined" @click="onCheckoutClicked">
                <i class="fa fa-shopping-cart"></i>
                <span>Checkout</span>
            </v-button>
        </div>

        <v-modal ref="checkout">
            <v-checkout></v-checkout>
        </v-modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        components: {
            'v-checkout': require('./checkout/checkout'),
            'v-login': require('./login'),
        },
        computed: mapGetters({
            subtotal: 'SHOP_CART_SUBTOTAL',
            total: 'SHOP_CART_TOTAL',
        }),
        methods: {
            onCheckoutClicked() {
                this.$refs.checkout.show();
            },
        },
    };
</script>
