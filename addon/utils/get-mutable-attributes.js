import Ember from 'ember';

const [major, minor] = Ember.VERSION.split('.');
const isGlimmer = major >= 2 && minor >= 10; // >= 2.10

let getMutValue;

if (isGlimmer) {
  const { MUTABLE_CELL } = Ember.__loader.require('ember-views/compat/attrs');
  getMutValue = (value) => {
    if (value && value[MUTABLE_CELL]) {
      return value.value;
    } else {
      return value;
    }
  };
} else {
  getMutValue = Ember.__loader.require('ember-glimmer/hooks/get-value')['default'];
}

export default function getMutableAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, attr) => {
    acc[attr] = getMutValue(attrs[attr]);
    return acc;
  }, {});
}
