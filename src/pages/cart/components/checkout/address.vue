<style lang="scss" scoped>@import 'core';
    .calculate-row {
        .cell {
            display: flex;
            justify-content: flex-end;
            padding-bottom: 0 !important;
        }
    }
</style>

<template>
    <form class="grid padded" @submit.prevent="onSubmit">
        <div class="row">
            <div class="cell mobile-12 tablet-6">
                <label class="form-label" for="address_1">Address</label>
                <input
                    class="form-control case-sensitive"
                    id="address_1"
                    placeholder="shipping address"
                    type="text"
                    required
                    v-model="address_1"
                    @change="onChange">
            </div>
            <div class="cell mobile-12 tablet-6">
                <label class="form-label" for="address_2">Apartment / Suite (optional)</label>
                <input
                    class="form-control case-sensitive"
                    id="address_2"
                    placeholder="apartment / suite"
                    type="text"
                    v-model="address_2"
                    @change="onChange">
            </div>
        </div>
        <div class="row">
            <div class="cell mobile-12 tablet-6">
                <label class="form-label" for="city">City</label>
                <input
                    class="form-control case-sensitive"
                    id="city"
                    placeholder="city"
                    type="text"
                    required
                    v-model="city"
                    @change="onChange">
            </div>
            <div class="cell mobile-12 tablet-6">
                <label class="form-label" for="zip">Zip code</label>
                <input
                    class="form-control"
                    id="zip"
                    min="0"
                    placeholder="zip code"
                    type="number"
                    required
                    v-model="zip"
                    @change="onChange">
            </div>
        </div>
        <div class="row">
            <div class="cell mobile-12 tablet-6">
                <label class="form-label" for="state">State</label>
                <v-select placeholder="select state" v-model="state" required>
                    <option v-for="{ code, name } in states" :value="code">{{ name }}</option>
                </v-select>
            </div>
            <div class="cell mobile-12 tablet-6">
                <label class="form-label" for="country">Country</label>
                <v-select placeholder="select country" v-model="country" required>
                    <option v-for="{ code, name } in countries" :value="code">{{ name }}</option>
                </v-select>
            </div>
        </div>
        <div class="row calculate-row">
            <div class="cell">
                <v-button type="submit">
                    Continue
                </v-button>
            </div>
        </div>
    </form>
</template>

<script>
    import countries from './countries';

    export default {
        data() {
            return {
                address_1: '',
                address_2: '',
                city: '',
                zip: '',
                country: 'US',
                state: null,
            };
        },
        computed: {
            countries() {
                return countries;
            },
            states() {
                if (this.country === null) {
                    return [];
                }

                let country = countries.find(country => country.code === this.country);

                return country && typeof country.states !== 'undefined'
                    ? country.states
                    : [];
            },
        },
        methods: {
            onChange() {
                this.$emit('change', this.$data);
            },
            onCountryChanged() {
                this.state = null;
            },
            onSubmit() {
                console.log ('ok...');
            },
        },
        watch: {
            country: 'onCountryChanged',
        },
    };
</script>
