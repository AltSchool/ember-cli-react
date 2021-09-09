/*jshint node:true*/

var pkg = require('../../package.json');

function getDependencyVersion(packageJson, name) {
  var dependencies = packageJson.dependencies;
  var devDependencies = packageJson.devDependencies;

  return dependencies[name] || devDependencies[name];
}

function getPeerDependencyVersion(packageJson, name) {
  var peerDependencies = packageJson.peerDependencies;

  return peerDependencies[name];
}

module.exports = {
  description: 'Install ember-cli-react dependencies into your app.',

  normalizeEntityName: function() {},

  // Install react into host app
  afterInstall: function() {
    const packages = [
      {
        name: 'ember-auto-import',
        target: getDependencyVersion(pkg, 'ember-auto-import'),
      },
      {
        name: 'react',
        target: getPeerDependencyVersion(pkg, 'react'),
      },
      {
        name: 'react-dom',
        target: getPeerDependencyVersion(pkg, 'react-dom'),
      },
    ];
    return this.addPackagesToProject(packages);
  },
};
