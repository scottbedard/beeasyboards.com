require('src/app/prototype');

describe('prototype extension', () => {

    it('array.prototype.clone', () => {
        let source = [{}];
        let shallow = source.clone();
        let deep = source.clone(true);

        // shallow
        expect(source).not.to.equal(shallow);
        expect(source[0]).to.equal(shallow[0]);
        expect(JSON.stringify(source)).to.equal(JSON.stringify(shallow));

        // deep
        expect(source).not.to.equal(deep);
        expect(source[0]).not.to.equal(deep[0]);
        expect(JSON.stringify(source)).to.equal(JSON.stringify(deep));
    });

    it('array.prototype.equals', () => {
        // loose
        expect([1, 2].equals([1])).to.equal(false);
        expect([1, 2].equals([2, 3])).to.equal(false);
        expect([1, 2, 3].equals([3, 2, 1])).to.equal(true);

        // strict
        expect([1, 2].equals([1], true)).to.equal(false);
        expect([1, 2].equals([2, 3], true)).to.equal(false);
        expect([1, 2, 3].equals([3, 2, 1], true)).to.equal(false);
        expect([1, 2, 3].equals([1, 2, 3], true)).to.equal(true);
    });

    it('array.prototype.intersect', () => {
        expect([1, 2, 3].intersect([3, 2, 1])).to.deep.equal([1, 2, 3]);
        expect([1, 2, 3, 4].intersect([1, 2, 3])).to.deep.equal([1, 2, 3]);
        expect([1, 2, 3, 3, 4].intersect([1, 2, 3])).to.deep.equal([1, 2, 3]);
    });

    it('array.prototype.unique', () => {
        expect([1, 1, 2].unique()).to.deep.equal([1, 2]);
    });
});
