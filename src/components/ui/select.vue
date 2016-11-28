<style lang="scss" scoped>@import 'core';
    $icon-stroke-color: #ccc;
    $icon-stroke-width: 2px;

    label + div > select {
        margin-top: 2px;
    }

    div {
        position: relative;
    }

    select {
        appearance: none; // hide the default dropdown in most browsers
        background-color: transparent;
        border-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        padding: 8px;
        text-indent: 1px;
        text-overflow: '';
        width: 100%;

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
        $cross-size: 14px;
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
        }

        &:before { transform: rotate(45deg) }
        &:after { transform: rotate(-45deg) }
    }
</style>

<template>
    <div>
        <select @change="onChanged" ref="select">
            <option v-if="placeholder.length" selected disabled>{{ placeholder }}</option>
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
        created() {
            this.value = this.placeholder;
        },
        data() {
            return {
                value: '',
            };
        },
        computed: {
            isEmpty() {
                return this.value === this.placeholder;
            },
        },
        methods: {
            onChanged(e) {
                this.value = this.$refs.select.value;
                this.$emit('change', this.value);
            },
            onClearClicked() {
                this.$emit('clear', this.value);

                this.value = this.placeholder;
                for (let i = 0, end = this.$refs.select.options.length; i < end; i++) {
                    let option = this.$refs.select.options[i];
                    option.selected = option.text == this.placeholder;
                }
            },
        },
        props: {
            clearable: { type: Boolean, default: true },
            placeholder: { type: String, default: '' },
        },
    };
</script>
