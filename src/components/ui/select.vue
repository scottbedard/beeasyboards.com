<style lang="scss" scoped>@import 'core';
    $icon-stroke-color: #ccc;
    $icon-stroke-width: 2px;

    div {
        position: relative;
    }

    select {
        appearance: none; // hide the default dropdown in most browsers
        cursor: pointer;
        &::-ms-expand { display: none } // hide the default dropdown arrow in IE
    }

    span {
        $arrow-size: 10px;
        border-color: $icon-stroke-color;
        border-style: solid;
        border-width: 0 $icon-stroke-width $icon-stroke-width 0;
        display: block;
        height: $arrow-size;
        pointer-events: none;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-65%) rotate(45deg);
        width: $arrow-size;
    }

    a {
        $cross-size: 15px;
        position: absolute;
        display: block;
        right: 11px;
        top: 50%;
        transform: translateY(-40%);
        height: $cross-size;
        width: $cross-size;
        z-index: 1;

        &:hover {
            &:before,
            &:after {
                border-color: darken($icon-stroke-color, 25%);
            }
        }

        &:before,
        &:after {
            content: '';
            display: block;
            border-left: 2px solid $icon-stroke-color;
            height: $cross-size;
            width: $icon-stroke-width;
            position: absolute;
            left: 50%;
            top: 0%;
            @include transition(border-color);
        }

        &:before { transform: rotate(45deg) }
        &:after { transform: rotate(-45deg) }
    }
</style>

<template>
    <div>
        <select
            class="form-control"
            ref="select"
            @input="onInput"
            :required="required">
            <option v-if="hasPlaceholder" disabled>{{ placeholder }}</option>
            <slot></slot>
        </select>
        <span v-if="isEmpty || ! clearable"></span>
        <a
            v-else-if="clearable"
            href="#"
            @click.prevent="onClearClicked">
        </a>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.onValueChanged();
        },
        computed: {
            isEmpty() {
                return this.value === null || this.value.length === 0;
            },
            hasPlaceholder() {
                return this.placeholder.length > 0;
            },
        },
        methods: {
            onClearClicked() {
                this.$emit('input', null);
            },
            onInput(e) {
                this.$emit('input', e.target.value);
            },
            onValueChanged() {
                this.$refs.select.value = this.value;

                if (! this.value && this.hasPlaceholder) {
                    this.$refs.select.options[0].selected = 'selected';
                }
            },
        },
        props: {
            clearable: { type: Boolean, default: true },
            required: { type: Boolean, default: false },
            placeholder: { type: String, default: '' },
            selected: { default: null },
            value: { default: '' },
        },
        watch: {
            value: 'onValueChanged',
        },
    };
</script>
