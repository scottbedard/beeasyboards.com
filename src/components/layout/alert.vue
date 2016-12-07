<style lang="scss" scoped>@import 'core';
    .v-alerts {
        bottom: 0;
        pointer-events: none;
        position: fixed;
        right: 0;
        width: 100%;
    }

    .v-transition-group {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin: 0 auto;
        max-width: $content-max-width;
        width: 100%;
        @include bp-prop(padding, 12px, false, 20px);
        @include transition(padding);
    }

    .alert {
        align-items: center;
        align-self: flex-end;
        border-radius: 3px;
        color: #eee;
        display: flex;
        font-size: 14px;
        font-weight: 300;
        justify-content: space-between;
        padding: 8px 10px;
        pointer-events: auto;
        @include bp-prop(width, 100%, false, 320px);
        @include transition(all);

        &:not(:last-child) { margin-bottom: 12px }
        &.error { background-color: $red }
        &.info { background-color: #333 }
        &.success { background-color: $green }
    }
</style>

<template>
    <div class="v-alerts">
        <transition-group name="fade" mode="out-in" tag="div" class="v-transition-group">
            <div
                class="alert"
                v-for="alert in alerts"
                :class="[alert.options.type]"
                :key="alert"
                @mouseenter="onMouseEnter(alert)"
                @mouseleave="onMouseLeave(alert)">

                <!-- String alerts -->
                <div
                    v-if="isStringAlert(alert.content)"
                    v-html="alert.content"
                    v-linkable>
                </div>

                <!-- Component alerts -->
                <component
                    v-else
                    :is="alert.content">
                </component>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState({
            alerts: state => state.alert.alerts,
        }),
        methods: {
            isStringAlert(content) {
                return typeof content === 'string';
            },
            onMouseEnter(alert) {
                // @todo: save the alert on mouseenter
            },
            onMouseLeave(alert) {
                // @todo: restart the timeout on mouseleave
            },
        },
    };
</script>
