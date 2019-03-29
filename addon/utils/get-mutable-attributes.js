import Ember from 'ember';
import semver from 'semver';

// Glimmer starts from v2.10
const isGlimmer = semver.gte(Ember.VERSION, '2.10.0');

let getMutValue;

if (isGlimmer) {
  // The module location before v3.2
  let libPath = 'ember-views/compat/attrs';

  if (semver.gte(Ember.VERSION, '3.6.0')) {
    libPath = '@ember/-internals/views/lib/compat/attrs';
  } else if (semver.gte(Ember.VERSION, '3.2.0')) {
    libPath = 'ember-views/lib/compat/attrs';
  }

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
