//
// Array
//
Array.prototype.clone = function() {
    return this.slice(0);
};

Array.prototype.intersect = function(otherArray) {
    return this.filter(el => otherArray.indexOf(el) !== -1).unique();
};

Array.prototype.unique = function() {
    return this.filter((el, index, source) => source.indexOf(el) === index);
};
