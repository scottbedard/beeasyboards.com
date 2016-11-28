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
                <option
                    v-for="value in option.values"
                    :disabled="! isAvailable(value)"
                    :value="value.id">
                    {{ value.name }}
                </option>
            </v-select>
        </div>
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
            availableInventoryValueIds() {
                return this.product.inventories
                    .filter(inventory => inventory.quantity > 0)
                    .map(inventory => inventory.option_values.map(value => value.id));
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
            isAvailable(value) {
                // determine what the selections would be if this value was included
                let possibleSelection = this.selectedValues
                    .filter(model => model.option_id != value.option_id)
                    .map(model => model.id);

                if (! possibleSelection.find(model => model.id == value.id)) {
                    possibleSelection.push(value.id);
                }

                // determine if our possible selection is part of the available inventories
                for (let valueIds of this.availableInventoryValueIds) {
                    if (possibleSelection.intersect(valueIds).length >= possibleSelection.length) {
                        return true;
                    }
                }

                return false;
            },
            getOptionId(option) {
                return `option-${ option.id }`;
            },
            onValueSelected(id) {
                let value = this.values.find(model => model.id == id);
                this.selectedValues = this.selectedValues.filter(model => model.option_id != value.option_id);
                this.selectedValues.push(value);
            },
            onValueCleared(id) {
                let value = this.values.find(model => model.id == id);
                this.selectedValues = this.selectedValues.filter(model => model.id != value.id);
            },
        },
        props: [
            'product',
        ],
    };
</script>
