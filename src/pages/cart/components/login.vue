<style lang="scss" scoped>@import 'core';
    .cell {
        padding-bottom: 6px !important;
    }

    .v-button {
        width: 100%;
    }
</style>

<template>
    <div class="grid padded">
        <div class="cell mobile-12 large-phone-4 tablet-12">
            <v-button color="facebook">
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
                <span>Sign in with Google</span>
            </v-button>
        </div>
    </div>
</template>
