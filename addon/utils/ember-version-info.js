import Ember from 'ember';

const emberVersionInfo = () => {
  const [major, minor] = Ember.VERSION.split('.');
  const isGlimmer = major > 2 || (major == 2 && minor >= 10); // >= 2.10
  return { major, minor, isGlimmer };
};

export default emberVersionInfo;
