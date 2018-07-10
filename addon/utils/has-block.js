import Ember from 'ember';

const [major, minor] = Ember.VERSION.split('.');
const isGlimmer = major > 2 || (major == 2 && minor >= 10); // >= 2.10

let hasBlockSymbol;

if (major == 3 && minor >= 1) {
  // do nothing since the symbol is not exported
} else if (isGlimmer) {
  hasBlockSymbol = Ember.__loader.require('ember-glimmer/component')[
    'HAS_BLOCK'
  ];
} else {
  hasBlockSymbol = Ember.__loader.require('ember-htmlbars/component')[
    'HAS_BLOCK'
  ];
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
