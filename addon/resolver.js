import Ember from 'ember';
import Resolver from 'ember-resolver';

import ReactComponent from 'ember-cli-react/components/react-component';

const { get } = Ember;

export default Resolver.extend({
  // `resolveComponent` is triggered when rendering a component in template.
  // For example, having `{{foo-bar}}` in a template will trigger `resolveComponent`
  // with the name full name of `component:foo-bar`.
  resolveComponent(parsedName) {
    // First try to resolve with React-styled file name (e.g. SayHi).
    // If nothing is found, try again with original convention via `resolveOther`.
    let result =
      this._resolveReactStyleFile(parsedName) || this.resolveOther(parsedName);

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
      this._resolveReactStyleFile(parsedName) || this.resolveOther(parsedName);
    parsedName.type = 'react-component';
    return result;
  },

  // This resolver method attempt to find a file with React-style file name.
  // A React-style file name is in PascalCase.
  // This is made a private method to prevent creation of "react-style-file:*"
  // factory.
  _resolveReactStyleFile(parsedName) {
    const originalName = parsedName.fullNameWithoutType;

    // Convert the compnent name while preserving namespaces
    const parts = originalName.split('/');
    parts[parts.length - 1] = Ember.String.classify(parts[parts.length - 1]);
    const newName = parts.join('/');

    const parsedNameWithPascalCase = Object.assign({}, parsedName, {
      fullNameWithoutType: newName,
    });
    const result = this.resolveOther(parsedNameWithPascalCase);
    return result;
  },
});
