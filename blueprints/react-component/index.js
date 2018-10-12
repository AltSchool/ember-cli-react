/*jshint node:true*/

var stringUtil         = require('ember-cli-string-utils');
var pathUtil           = require('ember-cli-path-utils');
var validComponentName = require('ember-cli-valid-component-name');
var getPathOption      = require('ember-cli-get-component-path-option');
var path               = require('path');

var normalizeEntityName = require('ember-cli-normalize-entity-name');

var templates = {
  func: '= props => {\n\n\treturn (\n\t\t<div></div>\n\t);\n};',
  class: 'extends React.Component {\n\trender() {\n\t\treturn (\n\t\t\t<div></div>\n\t\t);\n\t}\n};',
  blockless: '= props => \n\t(\n\t\t<div></div>\n\t);'
}

module.exports = {
  description: 'Generates a react component. Name must contain a hyphen.',

  availableOptions: [
    {
      name: 'type',
      type: String,
      default: 'class',
      aliases:[
        {'func': 'function'},
        {'no-block': 'blockless-function'}
      ]
    }
  ],

  fileMapTokens: function() {
    return {
      __path__: function(options) {
        return 'components';
      }
    };
  },

  normalizeEntityName: function(entityName) {
    entityName = normalizeEntityName(entityName);

    return validComponentName(entityName);
  },

  locals: function(attrs) {
    options = attrs.entity.options;
    var prefix = 'const';
    if (Object.keys(options).indexOf('func') !== -1) {
      return {
        prefix: prefix,
        contents: templates.func
      }
    }

    if (Object.keys(options).indexOf('no-block') !== -1) {
      return {
        prefix: prefix,
        contents: templates.blockless
      }
    }

    if (Object.keys(options).indexOf('type') !== -1) {
      if (options.type === 'function' || options.type === 'func') {
        return {
          prefix: prefix,
          contents: templates.func
        }
      }
      if (options.type === 'blockless-function' || options.type === 'no-block') {
        return {
          prefix: prefix,
          contents: templates.blockless
        }
      }
    }

    return {
      prefix: 'class',
      contents: templates.class
    };
  }
};
