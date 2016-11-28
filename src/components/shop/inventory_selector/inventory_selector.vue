<style lang="scss" scoped>@import 'core';
    label {
        display: block;
    }
</style>

<template>
    <div>
        <div v-for="option in product.options" class="option">
            <label :for="getOptionId(option)">{{ option.name }}</label>
            <v-select
                :id="getOptionId(option)"
                :placeholder="option.placeholder"
                @change="onValueSelected"
                @clear="onValueCleared">
                <option v-for="value in option.values">
                    {{ value.name }}
                </option>
            </v-select>
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
            getOptionId(option) {
                return `option-${ option.id }`;
            },
            onValueSelected(value) {
                console.log ('selected', value);
            },
            onValueCleared(value) {
                console.log ('cleared', value);
            },
        },
        props: [
            'product',
        ],
    };
</script>
