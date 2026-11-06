import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('orders quality values', () => {
  assert.deepEqual(api.parseAcceptLanguage('en;q=0.5, fr'), [
    { tag: 'fr', quality: 1, order: 1 },
    { tag: 'en', quality: 0.5, order: 0 },
  ]);
});
test('selects exact preferred language', () => {
  assert.equal(api.negotiateLanguage('fr-CA, en;q=0.8', ['en', 'fr-CA']), 'fr-CA');
});
test('falls back to primary language', () => {
  assert.equal(api.negotiateLanguage('fr-CA', ['en', 'fr']), 'fr');
});
test('uses wildcard fallback', () => {
  assert.equal(api.negotiateLanguage('*', ['en', 'fr']), 'en');
});
test('ignores zero quality', () => {
  assert.equal(api.negotiateLanguage('fr;q=0, en', ['fr', 'en']), 'en');
});
test('rejects invalid quality', () => {
  assert.throws(() => api.parseAcceptLanguage('en;q=2'), RangeError);
});
