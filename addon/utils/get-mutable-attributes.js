import Ember from 'ember';

var getMutValue = Ember.__loader.require('ember-htmlbars/hooks/get-value')['default'];

export default function getMutableAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, attr) => {
    acc[attr] = getMutValue(attrs[attr]);
    return acc;
  }, {});
}
