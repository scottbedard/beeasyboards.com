import $ from 'jquery';
import InventorySelector from 'src/pages/shop/components/inventory_selector';
import Vue from 'vue';

//
// Factory
//
const TestComponent = (propsData = { product: Product() }) => {
    const Component = Vue.extend(InventorySelector);

    return new Component({ propsData }).$mount();
};

//
// Fixtures
//
import ProductResponse from '../../fixtures/responses/product';
const Product = () => JSON.parse(JSON.stringify(ProductResponse));

//
// Specs
//
describe('inventory_selector.vue', () => {
    it('it should render a select box for each option, with options for each value', () => {
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
});
