// Run: node scripts/check-region.mjs — guards currency conversion and region mapping.
import assert from 'node:assert/strict';
import { convert, localize, money, regionForCountry, regions } from '../src/region.js';

const { IN, US, EU } = regions;
assert.equal(convert(79, IN), 79);
assert.equal(convert(79, US), 1.99);
assert.equal(convert(699, US), 13.99);
assert.equal(convert(12999, US), 259);
assert.equal(convert(0, US), 0);
assert.equal(money(1299, IN), '₹1,299');
assert.equal(money(79, US), '$1.99');
assert.equal(money(150000, US), '$2,999');
assert.equal(localize('Plus ₹9,999 one-time setup', US), 'Plus $199 one-time setup');
assert.equal(localize('Plus ₹9,999 one-time setup', IN), 'Plus ₹9,999 one-time setup');
assert.equal(regionForCountry('in'), 'IN');
assert.equal(regionForCountry('DE'), 'EU');
assert.equal(regionForCountry('BR'), 'US');
assert.ok(money(99, EU).includes('€'));
console.log('region checks passed');
