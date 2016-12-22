<style lang="scss" scoped>@import 'core';
    h3 {
        margin: 0;
    }

    a {
        // color: #666;
        font-weight: 300;
        font-size: 12px;
    }
</style>

<template>
    <div>
        <h3>Signed in as {{ user.name }}</h3>
        <a href="#" @click.prevent="onLogoutClicked">
            <i class="fa fa-sign-out"></i>
            <span>Sign out</span>
        </a>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import UserRepository from 'src/repositories/user';

    export default {
        computed: {
            ...mapGetters({
                firstName: 'USER_FIRST_NAME',
            }),
            ...mapState({
                user: state => state.user.user,
            }),
        },
        methods: {
            onLogoutClicked() {
                UserRepository.logout()
                    .then(this.onLogoutSuccess)
                    .catch(this.onLogoutFailed);
            },
            onLogoutFailed() {
                this.$alert('Whoa, something went wrong, please try again.', { type: 'error' });
            },
            onLogoutSuccess() {
                this.$store.commit('USER_LOGOUT');
            },
        },
    };
</script>
