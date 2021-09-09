'use strict';

const babel = require('broccoli-babel-transpiler');

module.exports = {
  name: 'ember-simple-react',

  preprocessTree: function(type, tree) {
    if (type === 'js') {
      const babelOptions = {
        filterExtensions: ['jsx'],
        presets: ['@babel/preset-react'],
      };
      return babel(tree, babelOptions);
    }

    return tree;
  },

  options: {
    autoImport: {
      devtool: 'inline-source-map',
    },
  },
};
