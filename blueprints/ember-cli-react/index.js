/*jshint node:true*/

var RSVP = require('rsvp');
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
    return RSVP.all([
      this.addPackageToProject(
        'ember-browserify',
        getDependencyVersion(pkg, 'ember-browserify')
      ),
      this.addPackageToProject('react', getDependencyVersion(pkg, 'react')),
      this.addPackageToProject(
        'react-dom',
        getDependencyVersion(pkg, 'react-dom')
      ),
    ]);
  },
};
