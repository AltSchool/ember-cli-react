import Ember from 'ember';
import semver from 'semver';

// Glimmer starts from v2.10
const isGlimmer = semver.gte(Ember.VERSION, '2.10.0');

let hasBlockSymbol;

try {
  if (semver.gte(Ember.VERSION, '3.1.0')) {
    // Ember-glimmer moved to TypeScript since v3.1
    // Do nothing since the symbol is not exported
  } else if (isGlimmer) {
    hasBlockSymbol = Ember.__loader.require('ember-glimmer/component')[
      'HAS_BLOCK'
    ];
  } else {
    hasBlockSymbol = Ember.__loader.require('ember-htmlbars/component')[
      'HAS_BLOCK'
    ];
  }
} catch (e) {
  // Fallback to use runtime check
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

  return Ember.get(emberComponent, hasBlockSymbol);
}
