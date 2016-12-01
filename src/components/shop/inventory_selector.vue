<style lang="scss" scoped>@import 'core';
    .option {
        margin-bottom: 12px;

        label {
            display: block;
        }
    }
</style>

<template>
    <form @submit.prevent="onAddToCartClicked">
        <div class="option">
            <label for="quantity">Quantity</label>
            <v-input
                min="0"
                type="number"
                v-model="quantity"
                :prevent-enter="formIsDisabled">
            </v-input>
        </div>
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
                    <template v-if="! isAvailable(value)">(out of stock)</template>
                </option>
            </v-select>
        </div>
        <v-button
            :disabled="formIsDisabled"
            type="submit">
            <v-button-spinner v-if="isLoading"></v-button-spinner>
            <span>{{ addButtonText }}</span>
        </v-button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                selectedValues: [],
                quantity: 1,
            };
        },
        computed: {
            addButtonText() {
                return this.isLoading
                    ? 'Adding...'
                    : 'Add to cart';
            },
            availableInventoryValueIds() {
                return this.product.inventories
                    .filter(inventory => inventory.quantity > 0)
                    .map(inventory => inventory.option_values.map(value => value.id));
            },
            formIsDisabled() {
                return this.isLoading
                    || ! this.selectedInventory
                    || this.selectedInventory.quantity <= 0;
            },
            selectedInventory() {
                let selectedValueIds = this.selectedValues.map(value => value.id);

                for (let inventory of this.product.inventories) {
                    let inventoryValueIds = inventory.option_values.map(value => value.id);
                    if (inventoryValueIds.intersect(selectedValueIds).length === inventoryValueIds.length) {
                        return inventory;
                    }
                }

                return null;
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
            onAddToCartClicked() {
                this.$emit('add', this.selectedInventory, this.quantity);
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
            'isLoading',
            'product',
        ],
    };
</script>
