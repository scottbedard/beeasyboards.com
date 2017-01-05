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
            <transition name="fade" mode="out-in">
                <v-user v-if="isLoggedIn"></v-user>
                <v-login v-else></v-login>
            </transition>
        </div>
        <div class="row checkout">
            <v-button class="outlined" @click="onCheckoutClicked">
                <i class="fa fa-shopping-cart"></i>
                <span>Checkout</span>
            </v-button>
        </div>

        <v-modal ref="modal">
            <v-checkout ref="checkout"></v-checkout>
        </v-modal>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';

    export default {
        components: {
            'v-checkout': require('./checkout/checkout'),
            'v-login': require('./login'),
            'v-user': require('./user'),
        },
        computed: {
            ...mapGetters({
                subtotal: 'SHOP_CART_SUBTOTAL',
                total: 'SHOP_CART_TOTAL',
                isLoggedIn: 'USER_IS_LOGGED_IN',
            }),
            ...mapState({
                user: state => state.user.user,
            }),
        },
        methods: {
            onCheckoutClicked() {
                this.$refs.modal.show();
                setTimeout(() => this.$refs.checkout.focus(), 200);
            },
        },
    };
</script>
