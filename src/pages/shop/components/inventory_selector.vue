<style lang="scss" scoped>@import 'core';
    .option {
        margin-bottom: 20px;
    }
</style>

<template>
    <form @submit.prevent="onAddToCart" :disabled="formIsDisabled">
        <div v-for="option in product.options" class="option">
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
        <v-button :disabled="formIsDisabled" type="submit">
            <v-button-spinner v-if="isLoading"></v-button-spinner>
            <span>{{ addButtonText }}</span>
        </v-button>
    </form>
</template>

<script>
    export default {
        created() {
            this.setInitialValues();
        },
        data() {
            return {
                selectedValues: [],
                quantity: 1,
            };
        },
        computed: {
            addButtonText() {
                return this.isLoading ? 'Adding...' : 'Add to cart';
            },
            availableInventories() {
                return this.product.inventories.filter(inventory => inventory.quantity > 0);
            },
            availableValueCombinations() {
                return this.availableInventories.map(inventory => {
                    return inventory.option_values.map(value => value.id);
                });
            },
            formIsDisabled() {
                return ! Boolean(this.selectedInventory);
            },
            selectedInventory() {
                let selectedValues = this.selectedValues.map(value => Number(value.value));

                return this.product.inventories.find(inventory => {
                    return inventory.option_values.map(value => value.id).equals(selectedValues);
                });
            },
        },
        methods: {
            isAvailable(option, value) {
                // determine what the selection would be if this value were included
                let values = this.selectedValues
                    .filter(model => model.value && model.option != option.id)
                    .map(value => Number(value.value));

                values.push(value.id);

                // check if the array of values is in stock
                return Boolean(this.availableValueCombinations.find(combination => {
                    return values.intersect(combination).equals(values);
                }));
            },
            onAddToCart() {
                this.$emit('add', this.selectedInventory, this.quantity);
            },
            setInitialValues() {
                for (let option of this.product.options) {
                    this.selectedValues.push({ option: option.id, value: null });
                }
            },
        },
        props: [
            'isLoading',
            'product',
        ],
    };
</script>
