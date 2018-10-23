const VersionChecker = require('ember-cli-version-checker');

function requireTransform(transformName) {
  return require.resolve(transformName);
}

function hasPlugin(plugins, name) {
  for (const maybePlugin of plugins) {
    const plugin = Array.isArray(maybePlugin) ? maybePlugin[0] : maybePlugin;
    const pluginName = typeof plugin === 'string' ? plugin : plugin.name;

    if (pluginName === name) {
      return true;
    }
  }

  return false;
}

module.exports = function configureJsxTransform(parent) {
  const options = (parent.options = parent.options || {});

  const checker = new VersionChecker(parent).for('ember-cli-babel', 'npm');

  options.babel = options.babel || {};
  options.babel.plugins = options.babel.plugins || [];

  if (checker.satisfies('^6.0.0-beta.1')) {
    if (!hasPlugin(options.babel.plugins, 'babel-plugin-transform-react-jsx')) {
      options.babel.plugins.push(
        requireTransform('babel-plugin-transform-react-jsx')
      );
    }
  } else if (checker.gte('7.0.0')) {
    if (
      !hasPlugin(options.babel.plugins, '@babel/plugin-transform-react-jsx')
    ) {
      options.babel.plugins.push(
        requireTransform('@babel/plugin-transform-react-jsx')
      );
    }
  }
};
