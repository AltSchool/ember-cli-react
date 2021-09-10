import Ember from 'ember';

function extractGlimmer(module) {
  const { MUTABLE_CELL } = module;
  return value => {
    if (value && value[MUTABLE_CELL]) {
      return value.value;
    } else {
      return value;
    }
  };
}

const candidates = [
  {
    // >= 3.6.0
    path: '@ember/-internals/views/lib/compat/attrs',
    extract: extractGlimmer,
  },
  {
    // >= 3.2.0
    path: 'ember-views/lib/compat/attrs',
    extract: extractGlimmer,
  },
  {
    // >= 2.10.0 (Glimmer)
    path: 'ember-views/compat/attrs',
    extract: extractGlimmer,
  },
  {
    // < 2.10.0 (Before Glimmer)
    path: 'ember-htmlbars/hooks/get-value',
    extract: module => {
      return module['default'];
    },
  },
];

let getMutValue;

for (const candidate of candidates) {
  const { path, extract } = candidate;
  try {
    const module = Ember.__loader.require(path);
    getMutValue = extract(module);
    break;
  } catch (e) {
    continue;
  }
}

export default function getMutableAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, attr) => {
    acc[attr] = getMutValue(attrs[attr]);
    return acc;
  }, {});
}
