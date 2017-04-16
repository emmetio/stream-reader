'use strict';

const assert = require('assert');
require('babel-register');
const StreamReader = require('../index').default;

describe('Stream Reader', () => {
    it('basic', () => {
        const data = 'hello';
        const s = new StreamReader(data);

        assert.equal(s.string, data);
        assert.equal(s.start, 0);
        assert.equal(s.pos, 0);

        assert.equal(s.peek(), data.charCodeAt(0));
        assert.equal(s.start, 0);
        assert.equal(s.pos, 0);

        assert.equal(s.next(), data.charCodeAt(0));
        assert.equal(s.next(), data.charCodeAt(1));
        assert.equal(s.start, 0);
        assert.equal(s.pos, 2);

        assert.equal(s.next(), data.charCodeAt(2));
        assert.equal(s.start, 0);
        assert.equal(s.pos, 3);

        assert.equal(s.current(), data.slice(0, 3));
    });

    it('should limit reader range', () => {
        const outer = new StreamReader('foo bar baz');
        const inner = outer.limit(4, 7);

        assert(outer !== inner);

        let outerValue = '', innerValue = '';
        while (!outer.eof()) {
            outerValue += String.fromCharCode(outer.next());
        }

        while (!inner.eof()) {
            innerValue += String.fromCharCode(inner.next());
        }

        assert.equal(outerValue, 'foo bar baz');
        assert.equal(innerValue, 'bar');
    });
});
