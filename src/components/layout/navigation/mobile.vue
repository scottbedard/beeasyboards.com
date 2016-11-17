<style lang="scss" scoped>@import 'core';
    .v-navigation-mobile {
        position: fixed;
        left: 0;
        top: 0;
        border: 5px solid green;
        height: 100%;
        transform: translateX(-100%);
        width: 70%;
        @include transition(transform);

        &.is-visible {
            transform: translateX(0%);
        }
    }
</style>

<template>
    <div class="v-navigation-mobile" :class="{ 'is-visible': isVisible }">
        Mobile nav!
    </div>
</template>

<script>
    export default {
        computed: {
            isVisible() {
                return this.$store.state.navigation.isExpanded;
            },
        },
        methods: {
            onBodyClicked(e) {
                // hide the nav if the click did not pass through our element
                if (! e.path.find(el => el === this.$el)) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.$store.commit('NAVIGATION_HIDE');
                }
            },
            onIsVisbleChanged(isVisible) {
                let action = isVisible ? 'addEventListener' : 'removeEventListener';
                document[action]('click', this.onBodyClicked, true);
            },
        },
        watch: {
            isVisible: 'onIsVisbleChanged',
        },
    };
</script>
