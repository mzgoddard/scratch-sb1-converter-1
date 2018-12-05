require('@babel/register');

const test = require('tap').test;

const SB1 = require('../..');

test('loads package', t => {
    t.type(SB1, Object);
    // throw new Error('oops');
    t.end();
});
