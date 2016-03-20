/*jshint node:true*/

var RSVP = require('rsvp');

module.exports = {
  description: 'Install ember-react dependencies into your app.',

  normalizeEntityName: function() {},

  // Install react into host app
  afterInstall: function() {
    return RSVP.all([
      this.addPackageToProject("ember-browserify", "^1.1.7"),
      this.addPackageToProject("react", "^0.14.7"),
      this.addPackageToProject("react-dom", "^0.14.7")
    ]);
  }
};
