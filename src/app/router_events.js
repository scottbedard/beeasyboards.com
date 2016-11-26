//
// Before
//
export function beforeEach (to, from, next) {
    next();
};

//
// After
//
export function afterEach (to, from) {
    document.title = typeof to.meta.title !== 'undefined'
        ? `be easy - ${ to.meta.title }`
        : 'be easy';
};
