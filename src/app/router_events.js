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
    document.title = 'be easy';
};
