<style lang="scss" scoped>@import 'core';
    // $hamburger-padding-x                       : 15px;
    // $hamburger-padding-y                       : 15px;
    // $hamburger-layer-width                     : 40px;
    // $hamburger-layer-height                    : 4px;
    // $hamburger-layer-spacing                   : 6px;
    $hamburger-layer-color                     : $off-white;
    // $hamburger-layer-border-radius             : 4px;
    // $hamburger-hover-opacity                   : 0.7;
    // $hamburger-hover-transition-duration       : 0.15s;
    // $hamburger-hover-transition-timing-function: linear;
    // $hamburger-hover-use-filter                : false;
    // $hamburger-hover-filter                    : opacity(50%);

    // Types (Remove or comment out what you don’t need)
    $hamburger-types: (
        // 3dx,
        // 3dx-r,
        // 3dy,
        // 3dy-r,
        // arrow,
        // arrow-r,
        // arrowalt,
        // arrowalt-r,
        // boring,
        // collapse,
        // collapse-r,
        // elastic,
        // elastic-r,
        // emphatic,
        // emphatic-r,
        slider,
        // slider-r,
        // spring,
        // spring-r,
        // stand,
        // stand-r,
        // spin,
        // spin-r,
        // squeeze,
        // vortex,
        // vortex-r
    ) !default;

    @import 'hamburgers/_sass/hamburgers/hamburgers';

    div {
        display: flex;
        align-items: center;
    }

    button {
        outline: none;
    }
</style>

<template>
    <div>
        <button
            aria-controls="mobile_navigation"
            aria-label="Menu"
            class="hamburger hamburger--slider"
            type="button"
            :class="{ 'is-active': isExpanded }"
            @click.prevent="onClicked">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState({
            isExpanded: state => state.navigation.isExpanded,
        }),
        methods: {
            onClicked() {
                this.$store.commit('NAVIGATION_TOGGLE');
            },
        },
    };
</script>
