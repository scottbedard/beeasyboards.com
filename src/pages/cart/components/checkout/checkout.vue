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
        <h2>Shipping info</h2>
        <v-customer ref="customer" @change="onCustomerChanged"></v-customer>
        <v-address @change="onAddressChanged"></v-address>
    </div>
</template>

<script>
    export default {
        components: {
            'v-address': require('./address'),
            'v-customer': require('./customer'),
        },
        data() {
            return {
                address: {},
                customer: {},
            };
        },
        methods: {
            focus() {
                this.$refs.customer.focus();
            },
            onAddressChanged(data) {
                this.address = data;
            },
            onCustomerChanged(data) {
                this.customer = data;
            },
        },
    };
</script>
