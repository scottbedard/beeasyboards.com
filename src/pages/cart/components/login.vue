<style lang="scss" scoped>@import 'core';
    h3 {
        margin: 0;
    }
    a {
        display: block;
        margin-top: 10px;

        &:hover {
            text-decoration: none;

            span {
                text-decoration: underline;
            }
        }

        &.facebook { color: $facebook-blue }
        &.twitter { color: $twitter-blue }
        &.google { color: $google-red }

        .v-spinner {
            justify-content: flex-start;
            width: 25px;
        }

        i {
            width: 25px;
            text-align: left;
        }
    }
</style>

<template>
    <div>
        <h3>Want us to remember you for next time?</h3>
        <a href="/api/bedard/socialite/twitter" @click.prevent="onTwitterClicked" class="twitter">
            <transition name="fade" mode="out-in">
                <v-spinner :size="spinnerSize" v-if="twitterIsLoading"></v-spinner>
                <i v-else class="fa fa-twitter"></i>
            </transition>
            <span>Sign in with Twitter</span>
        </a>
        <a href="/api/bedard/socialite/facebook" @click.prevent="onFacebookClicked" class="facebook">
            <transition name="fade" mode="out-in">
                <v-spinner :size="spinnerSize" v-if="facebookIsLoading"></v-spinner>
                <i v-else class="fa fa-facebook"></i>
            </transition>
            <span>Sign in with Facebook</span>
        </a>
        <a href="/api/bedard/socialite/google" @click.prevent="onGoogleClicked" class="google">
            <transition name="fade" mode="out-in">
                <v-spinner :size="spinnerSize" v-if="googleIsLoading"></v-spinner>
                <i v-else class="fa fa-google-plus"></i>
            </transition>
            <span>Sign in with Google</span>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                facebookIsLoading: false,
                googleIsLoading: false,
                spinnerSize: "16px",
                twitterIsLoading: false,
            };
        },
        methods: {
            onFacebookClicked() {
                this.facebookIsLoading = true;
                this.redirect('facebook');
            },
            onTwitterClicked() {
                this.twitterIsLoading = true;
                this.redirect('twitter');
            },
            onGoogleClicked() {
                this.googleIsLoading = true;
                this.redirect('google');
            },
            redirect(provider) {
                window.location.replace(`/api/bedard/socialite/${ provider }`)
            },
        },
    };
</script>
