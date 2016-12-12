import Vue from 'vue';

Vue.filter('money', value => {

    console.log ('value', value, typeof value);
    
    let amount = '$' + value.toFixed(2);

    return amount.endsWith('.00')
        ? amount.replace('.00', '')
        : amount;
});
