<style lang="scss" scoped>@import 'core';

</style>

<template>
    <input
        class="form-control"
        :max="max"
        :min="min"
        :type="type"
        @input="onInput"
        @keydown="onKeydown"
        @keyup="onKeyup"
        @keypress="onKeypress"
    />
</template>

<script>
    export default {
        methods: {
            onInput(e) {
                this.$emit('input', e.currentTarget.value);
            },
            onKeydown(e) {
                this.$emit('keydown', e);
            },
            onKeypress(e) {
                let code = e.keyCode || e.which;
                if (this.preventEnter && code === 13) {
                    e.preventDefault();
                }

                this.$emit('keypress', e);
            },
            onKeyup(e) {
                this.$emit('keyup', e);
            },
        },
        props: {
            max: { default: null },
            min: { default: null },
            preventEnter: { type: Boolean, default: false },
            type: { type: String, default: 'text' },
        },
    };
</script>
