/* eslint-env node */
'use strict';

const react = require('broccoli-react');

module.exports = {
  name: 'ember-cli-react',

  appOptions() {
    return (
      (this.parent && this.parent.options) || (this.app && this.app.options)
    );
  },

  included() {
    let app;

    // @source: https://github.com/samselikoff/ember-cli-mirage/blob/master/index.js#L34
    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      let current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    this.app = app;
    this.addonBuildConfig = this.app.options['ember-cli-react'] || {
      babelOptions: {},
    };

    this._super.included.apply(this, arguments);
  },

  preprocessTree(type, tree) {
    if (type === 'js') {
      let { babelOptions } = this.addonBuildConfig;
      tree = react(tree, {
        transform: { es6module: true },
        babelOptions,
      });
    }

    return tree;
  },

  options: {
    autoImport: {
      devtool: 'inline-source-map',
    },
  },
};
