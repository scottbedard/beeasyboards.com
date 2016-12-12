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
        <select @change="onChanged" class="form-control" ref="select">
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
        mounted() {
            this.selectInitialValue();
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
            selectInitialValue() {
                if (this.selected !== null) {
                    let options = this.$refs.select.options;

                    for (let option, i = 0; option = options[i]; i++) {
                        if (option.value == this.selected) {
                            this.$refs.select.selectedIndex = i;
                            break;
                        }
                    }
                }
            },
        },
        props: {
            clearable: { type: Boolean, default: true },
            placeholder: { type: String, default: '' },
            selected: { default: null },
        },
    };
</script>
