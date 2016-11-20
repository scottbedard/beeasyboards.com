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
            border: 1px solid;
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

            &:not(.is-clickable) {
                $not-clickable-color: lighten($off-black, 25%);
                border-color: $not-clickable-color;
                color: $not-clickable-color;
                cursor: default;
                pointer-events: none;
            }

            &.is-clickable {
                border-color: $off-black;
                color: $off-black;

                &:hover,
                &.is-selected {
                    background-color: $off-black;
                    box-shadow: 0 4px 10px 0 rgba($off-black, 0.45);
                    color: $off-white;
                }
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
                        :class="{
                            'is-clickable': valueIsClickable(value),
                            'is-selected': valueIsSelected(value),
                        }"
                        @click.prevent="onValueClicked(value)">
                        {{ value.name }}
                    </a>
                </div>
            </div>
        </div>
        <pre>{{ selectedValues }}</pre>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedValues: [],
            };
        },
        computed: {
            possibleInventories() {
                return this.product.inventories.filter(inventory => {
                    // let valueIds = inventory.option_values.map(value => value.id);
                    //
                    // for (let value of this.selectedValues) {
                    //     if (valueIds.indexOf(selectedValueId) === -1) {
                    //         return false;
                    //     }
                    // }

                    return true;
                });
            },
            values() {
                let values = [];
                for (let option of this.product.options) {
                    for (let value of option.values) {
                        values.push(value);
                    }
                }

                return values;
            },
        },
        methods: {
            valueIsSelected(value) {
                return this.selectedValues.indexOf(value) !== -1;
            },
            valueIsClickable(value) {
                // let inventories = this.possibleInventories;

                return true;
            },
            onValueClicked(value) {
                if (this.valueIsSelected(value)) {
                    this.selectedValues.splice(this.selectedValues.indexOf(value), 1);
                } else {
                    this.selectedValues.push(value);
                }
            },
        },
        props: [
            'product',
        ],
    };
</script>
