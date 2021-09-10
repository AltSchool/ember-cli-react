import { get } from '@ember/object';
import Ember from 'ember';

// Not all versions of Ember can get this early.
// For some we need to compute at runtime.
const candidates = [
  // >= 2.10.0 (Glimmer)
  'ember-glimmer/component',

  // < 2.10.0 (Before Glimmer)
  'ember-htmlbars/component',
];

let hasBlockSymbol;

for (const candidate of candidates) {
  try {
    hasBlockSymbol = Ember.__loader.require(candidate)['HAS_BLOCK'];
    break;
  } catch (e) {
    continue;
  }
}

// NOTE: I really don't know how to test this
export default function hasBlock(emberComponent) {
  // Since Glimmer moved to TypeScript, we can't get the symbol.
  // This is a terrible but working way to get the value.
  if (!hasBlockSymbol) {
    const regex = /HAS_BLOCK/;
    hasBlockSymbol = Object.getOwnPropertyNames(emberComponent).find(key =>
      regex.test(key)
    );
  }

  return get(emberComponent, hasBlockSymbol);
}
