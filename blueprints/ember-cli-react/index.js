/*jshint node:true*/

var pkg = require('../../package.json');

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
