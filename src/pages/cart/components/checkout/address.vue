<style lang="scss" scoped>@import 'core';
    .new-customer {

    }

    .returning-customer {
        .cell { padding-bottom: 10px !important }
        .v-button { width: 100% }
    }
</style>

<template>
    <div class="grid">
        <div class="new-customer cell mobile-12 tablet-7">
            <h2>New customers</h2>
        </div>
        <div class="returning-customer cell mobile-12 tablet-5">
            <h2>Returning homies</h2>
            <div class="grid padded">
                <div class="cell mobile-12 large-phone-4 tablet-12">
                    <v-button color="facebook" @click="onFacebookClicked">
                        <i class="fa fa-facebook"></i>
                        <span>Sign in with Facebook</span>
                    </v-button>
                </div>
                <div class="cell mobile-12 large-phone-4 tablet-12">
                    <v-button color="twitter">
                        <i class="fa fa-twitter"></i>
                        <span>Sign in with Twitter</span>
                    </v-button>
                </div>
                <div class="cell mobile-12 large-phone-4 tablet-12">
                    <v-button color="google">
                        <i class="fa fa-google-plus"></i>
                        <span>Sign in with Google+</span>
                    </v-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            onFacebookClicked() {
                let fb = window.open('/api/bedard/socialite/facebook', '', 'width=480,height=768');

                fb.onload = () => {
                    console.log ('load', fb);
                };

                fb.onbeforeunload = () => {
                    console.log ('unload', arguments);
                };
            },
        },
    };
</script>
