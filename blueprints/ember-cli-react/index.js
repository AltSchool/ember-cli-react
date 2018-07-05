/*jshint node:true*/

var pkg = require('../../package.json');

function getDependencyVersion(packageJson, name) {
  var dependencies = packageJson.dependencies;
  var devDependencies = packageJson.devDependencies;

  return dependencies[name] || devDependencies[name];
}

module.exports = {
  description: 'Install ember-cli-react dependencies into your app.',

  normalizeEntityName: function() {},

  // Install react into host app
  afterInstall: function() {
    return this.addPackageToProject(
      'ember-auto-import',
      getDependencyVersion(pkg, 'ember-auto-import')
    );
  },
};
