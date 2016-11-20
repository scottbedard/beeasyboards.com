<style lang="scss" scoped>@import 'core';
    .option {
        &:not(:last-of-type) {
            margin-bottom: 20px;
        }
    }

    .values {
        div {
            justify-content: space-around;
            display: flex;
            flex-wrap: wrap;
            padding-top: 5px;
        }

        a {
            $circle-size: 65px;
            align-items: center;
            border-radius: $circle-size / 2;
            border: 1px solid $off-black;
            color: $off-black;
            display: flex;
            flex-basis: auto;
            font-size: 14px;
            height: $circle-size;
            justify-content: center;
            margin: 5px;
            min-width: $circle-size;
            text-decoration: none;
            width: $circle-size;
            @include transition('background-color, color');

            &:hover {
                background-color: $off-black;
                box-shadow: 0 4px 10px 0 rgba($off-black, 0.45);
                color: $off-white;
            }
        }
    }
</style>

<template>
    <div>
        <div v-for="option in product.options" class="option">
            <label>{{ option.placeholder }}</label>
            <div class="values">
                <div>
                    <a
                        href="#"
                        v-for="value in option.values"
                        @click.prevent="onValueClicked(value)">
                        {{ value.name }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            onValueClicked(value) {
                //
            },
        },
        props: [
            'product',
        ],
    };
</script>
