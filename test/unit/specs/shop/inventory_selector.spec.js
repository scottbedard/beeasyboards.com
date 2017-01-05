import $ from 'jquery';
import InventorySelector from 'src/pages/shop/components/inventory_selector';
import Vue from 'vue';

// fixtures
import ProductResponse from '../../../fixtures/responses/product';
const Product = (data = null) => JSON.parse(JSON.stringify(data || ProductResponse));

// factory
const TestComponent = (propsData = { product: Product() }) => {
    const Component = Vue.extend(InventorySelector);

    return new Component({ propsData }).$mount();
};

// specs
describe('shop - inventory_selector.vue', () => {
    it('renders a select box for each option', () => {
        let product = Product();
        let options = product.options.length;
        let inventories = product.options.map(option => option.values.length).reduce((a, b) => a + b, 0);
        let vm = TestComponent({ product });

        expect($(vm.$el).find('select').length).to.equal(options);
        expect($(vm.$el).find('option').length).to.equal(inventories + options);
    });

    it('displays placeholders as the first option', () => {
        let product = Product();
        let vm = TestComponent({ product });
        let $first = $(vm.$el).find('select:eq(0) > option:first-child');
        let $second = $(vm.$el).find('select:eq(1) > option:first-child');

        expect($first.text().trim()).to.equal(product.options[0].placeholder);
        expect($second.text().trim()).to.equal(product.options[1].placeholder);
    });

    it('disables selections that are not in stock', (done) => {
        let product = {
            'inventories': [
                {
                    'id': 10, 'product_id': 10, 'quantity': 3,
                    'option_values': [
                        { id: 28, name: 'small', option_id: 10 },
                        { id: 33, name: 'green', option_id: 11 },
                    ],
                },
                {
                    'id': 11, 'product_id': 10, 'quantity': 4,
                    'option_values': [
                        { id: 29, name: 'medium', option_id: 10 },
                        { id: 32, name: 'red', option_id: 11 },
                    ],
                },
                {
                    'id': 12, 'product_id': 10, 'quantity': 0,
                    'option_values': [
                        { id: 28, name: 'small', option_id: 10 },
                        { id: 31, name: 'blue', option_id: 11 },
                    ],
                },
            ],
            'options': [
                {
                    'id': 10, 'product_id': 10, 'name': 'Size', 'placeholder': '-- select size --',
                    'values': [
                        { id: 28, name: 'small', option_id: 10 },
                        { id: 29, name: 'medium', option_id: 10 },
                        { id: 30, name: 'large', option_id: 10 },
                    ],
                },
                {
                    'id': 11, 'product_id': 10, 'name': 'Color', 'placeholder': '-- select color --',
                    'values': [
                        { id: 32, name: 'red', option_id: 11 },
                        { id: 33, name: 'green', option_id: 11 },
                        { id: 31, name: 'blue', option_id: 11 },
                    ],
                },
            ],
        };

        let vm = TestComponent({ product });
        let $red = $(vm.$el).find('option:contains("red")').first();
        let $green = $(vm.$el).find('option:contains("green")').first();
        let $blue = $(vm.$el).find('option:contains("blue")').first();
        let $small = $(vm.$el).find('option:contains("small")').first();
        let $medium = $(vm.$el).find('option:contains("medium")').first();
        let $large = $(vm.$el).find('option:contains("large")').first();

        // blue and large should be disabled from the get go
        expect($red.prop('disabled')).to.equal(false);
        expect($green.prop('disabled')).to.equal(false);
        expect($small.prop('disabled')).to.equal(false);
        expect($medium.prop('disabled')).to.equal(false);
        expect($blue.prop('disabled')).to.equal(true);
        expect($large.prop('disabled')).to.equal(true);

        // selecting medium should disable green, but leave small enabled
        vm.selectedValues.find(model => model.option == 10).value = "29";
        vm.$nextTick(() => {
            expect($green.prop('disabled')).to.equal(true);
            expect($small.prop('disabled')).to.equal(false);
            done();
        });
    });
});
