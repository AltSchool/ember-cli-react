/* eslint-env node */
'use strict';

const react = require('broccoli-react');

module.exports = {
  name: 'ember-cli-react',

  preprocessTree: function(type, tree) {
    if (type === 'js') {
      tree = react(tree, { transform: { es6module: true } });
    }

    return tree;
  },
};
