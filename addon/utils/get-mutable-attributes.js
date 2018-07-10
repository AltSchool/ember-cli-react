import Ember from 'ember';
import emberVersionInfo from './ember-version-info';

const { major, minor, isGlimmer } = emberVersionInfo();

let getMutValue;

if (isGlimmer) {
  // The module location changed since v3.2
  let libPath =
    major > 3 || (major == 3 && minor >= 2)
      ? 'ember-views/lib/compat/attrs'
      : 'ember-views/compat/attrs';
  const { MUTABLE_CELL } = Ember.__loader.require(libPath);
  getMutValue = value => {
    if (value && value[MUTABLE_CELL]) {
      return value.value;
    } else {
      return value;
    }
  };
} else {
  getMutValue = Ember.__loader.require('ember-htmlbars/hooks/get-value')[
    'default'
  ];
}

export default function getMutableAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, attr) => {
    acc[attr] = getMutValue(attrs[attr]);
    return acc;
  }, {});
}
