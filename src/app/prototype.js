/**
 * Clone an array.
 *
 * @param  {Boolean}    deep
 * @return {Array}
 */
Array.prototype.clone = function(deep = false) {
    return deep
        ? JSON.parse(JSON.stringify(this))
        : this.slice(0);
};

/**
 * Find the intersection of two arrays.
 *
 * @param  {Array} array
 * @return {Array}
 */
Array.prototype.intersect = function(array) {
    return this.filter(el => array.indexOf(el) !== -1).unique();
};

/**
 * Find unique values in an array.
 *
 * @return {Array}
 */
Array.prototype.unique = function() {
    return this.filter((el, index, source) => source.indexOf(el) === index);
};

/**
 * Determine if two arrays contain the same members.
 *
 * @param  {Array}      array
 * @param  {Boolean}    strict
 * @return {Boolean}
 */
Array.prototype.equals = function(array, strict = false) {
    // if our array is falsey, or not the same length, we can return false right away
    if (!array || this.length != array.length) return false;

    for (let i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i], strict)) return false;
        } else if (strict && this[i] != array[i]) {
            return false;
        } else if (!strict) {
            return this.sort().equals(array.sort(), true);
        }
    }

    return true;
};
