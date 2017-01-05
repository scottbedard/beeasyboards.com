<style lang="scss" scoped>@import 'core';

</style>

<template>
    <div>
        <div v-for="option in product.options">
            <v-select
                v-model="selectedValues.find(selected => selected.option === option.id).value"
                :placeholder="option.placeholder">
                <option
                    v-for="value in option.values"
                    :disabled="! isAvailable(option, value)"
                    :value="value.id"><!--
                 -->{{ value.name }}<!--
             --></option>
            </v-select>
        </div>
        <pre>{{ $data }}</pre>
    </div>
</template>

<script>
    export default {
        created() {
            this.setInitialValues();
        },
        data() {
            return {
                selectedValues: [],
            };
        },
        computed: {
            availableInventories() {
                return this.product.inventories.filter(inventory => inventory.quantity > 0);
            },
            availableValueCombinations() {
                return this.availableInventories.map(inventory => {
                    return inventory.option_values.map(value => value.id);
                });
            },
        },
        methods: {
            isAvailable(option, value) {
                // determine what the selection would be if this value were included
                let values = this.selectedValues
                    .filter(value => value.option != option.id)
                    .filter(value => value.value)
                    .map(value => Number(value.value));

                values.push(value.id);

                // check if the array of values is in stock
                return Boolean(this.availableValueCombinations.find(combination => {
                    return values.intersect(combination).equals(values);
                }));
            },
            setInitialValues() {
                for (let option of this.product.options) {
                    this.selectedValues.push({ option: option.id, value: null });
                }
            },
        },
        props: [
            'product',
        ],
    };
</script>
