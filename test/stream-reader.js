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

        assert.equal(s.peek(), data.charAt(0));
        assert.equal(s.peekCode(), data.charCodeAt(0));
        assert.equal(s.start, 0);
        assert.equal(s.pos, 0);

        assert.equal(s.next(), data.charAt(0));
        assert.equal(s.next(), data.charAt(1));
        assert.equal(s.start, 0);
        assert.equal(s.pos, 2);

        assert.equal(s.nextCode(), data.charCodeAt(2));
        assert.equal(s.start, 0);
        assert.equal(s.pos, 3);

        assert.equal(s.current(), data.slice(0, 3));
    });

    it('eat quoted', () => {
        const data = '"foo"   \'bar\'';
        const s = new StreamReader(data);

        let quote = s.next();
        assert.equal(quote, '"');

        assert(s.eatQuoted(quote));
        assert.equal(s.start, 0);
        assert.equal(s.pos, 5);
        assert.equal(s.current(), '"foo"');

        // no double-quoted value ahead
        assert(!s.eatQuoted(quote));

        // eat space
        assert(s.eatWhile(' '));

        s.save();
        assert.equal(s.start, 8);

        quote = s.next();
        assert.equal(quote, "'");
        assert(s.eatQuoted(quote));
        assert.equal(s.pos, 13);
        assert.equal(s.current(), "'bar'");
        assert(s.eol());
    });
});
