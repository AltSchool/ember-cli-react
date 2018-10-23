/* eslint-env node */
'use strict';

const configureJsxTransform = require('./lib/configure-jsx-transform');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const path = require('path');

module.exports = {
  name: 'ember-cli-react',

  included(parent) {
    this._super.included.apply(this, arguments);

    configureJsxTransform(parent);

    parent.registry.add('js', {
      name: 'ember-cli-react',
      ext: 'jsx',
      toTree(tree) {
        // get all JSX files and rename them to js
        let jsx = new Funnel(tree, {
          include: ['**/*.jsx'],
          getDestinationPath(relativePath) {
            let f = path.parse(relativePath);
            if (f.ext === '.jsx') {
              return path.join(f.dir, `${f.name}.js`);
            } else {
              return relativePath;
            }
          },
        });

        // apply preprocessing from other babel plugins
        let processed = parent.registry
          .load('js')
          .filter(p => p.name !== 'ember-cli-react')
          .reduce((tree, plugin) => plugin.toTree(tree), jsx);

        let withoutJsx = new Funnel(tree, {
          exclude: ['**/*.jsx'],
        });

        return mergeTrees([withoutJsx, processed]);
      },
    });
  },

  options: {
    autoImport: {
      devtool: 'inline-source-map',
    },
  },
};
