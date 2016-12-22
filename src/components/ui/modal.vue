<style lang="scss" scoped>@import 'core';
    .v-modal {
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        height: 100%;
        justify-content: center;
        left: 0;
        opacity: 0;
        position: fixed;
        top: 0;
        width: 100%;
        visibility: hidden;
        @include transition('opacity, visibility', 100ms);

        &.is-visible {
            visibility: visible;
            opacity: 1;

            .content {
                transform: translateY(0);
            }
        }
    }

    .content {
        background: #fff;
        border-radius: 3px;
        margin: 12px;
        max-width: 768px;
        padding: 20px;
        position: relative;
        transform: translateY(-20px);
        width: 100%;
        @include transition(transform, 100ms);

        > a.hide {
            color: #999;
            font-size: 24px;
            text-decoration: none;
            position: absolute;
            top: 0;
            right: 0;
            padding: 20px 20px 0 0;
            @include transition(color);

            &:hover { color: #333 }
        }
    }
</style>

<template>
    <div
        class="v-modal"
        :class="{ 'is-visible': isVisible }"
        @click="hide">
        <div class="content" @click.stop>
            <slot></slot>
            <a
                class="hide"
                href="#"
                @click.prevent="hide"
                v-if="showCloseButton">
                &#x2715; <!-- X -->
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isVisible: false,
            };
        },
        methods: {
            hide() {
                this.isVisible = false;
            },
            show() {
                this.isVisible = true;
            },
        },
        props: {
            showCloseButton: { type: Boolean, default: false },
        },
    };
</script>
