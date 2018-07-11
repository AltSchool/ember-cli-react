import Ember from 'ember';
import Resolver from 'ember-resolver';

import ReactComponent from 'ember-cli-react/components/react-component';

const { get } = Ember;

export default Resolver.extend({
  // `resolveComponent` is triggered when rendering a component in template.
  // For example, having `{{foo-bar}}` in a template will trigger `resolveComponent`
  // with the name full name of `component:foo-bar`.
  resolveComponent(parsedName) {
    // First try to resolve with the convention of Ember CLI via `resolveOther`.
    // If nothing is found, try again with React-styled file name (e.g. SayHi).
    let result =
      this.resolveOther(parsedName) || this.resolveReactStyleFile(parsedName);

    // If there is no result found after all, return nothing
    if (!result) {
      return;
    }

    // If there is an Ember component found, return it.
    // This includes the `react-component` Ember component.
    if (get(result, 'isComponentFactory')) {
      return result;
    } else {
      // This enables using React Components directly in template
      return ReactComponent.extend({
        reactComponent: result,
      });
    }
  },

  // This resolver method is defined when we try to lookup from `react-component`.
  // We create a new namespace `react-component:the-component` for them.
  resolveReactComponent(parsedName) {
    parsedName.type = 'component';
    const result =
      this.resolveOther(parsedName) || this.resolveReactStyleFile(parsedName);
    parsedName.type = 'react-component';
    return result;
  },

  // This resolver method attempt to find a file with React-style file name.
  // A React-style file name is capitalized camel-cased.
  resolveReactStyleFile(parsedName) {
    const originalName = parsedName.fullNameWithoutType;
    parsedName.fullNameWithoutType = Ember.String.classify(originalName);
    const result = this.resolveOther(parsedName);
    parsedName.fullNameWithoutType = originalName;
    return result;
  },
});
