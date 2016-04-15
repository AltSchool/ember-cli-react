import Ember from 'ember';
import React from 'npm:react';
import ReactDOM from 'npm:react-dom';

import getMutableAttributes from 'ember-cli-react/utils/get-mutable-attributes';
import lookupFactory from 'ember-cli-react/utils/lookup-factory';


const { get } = Ember;

const ReactComponent = Ember.Component.extend({
  /**
    The React component that this Ember component should wrap.

    @property reactComponent
    @type React.Component | Function | String
    @default null
   */
  reactComponent: Ember.computed.reads('_reactComponent'),

  didRender: function() {
    this.renderReactComponent();
  },

  renderReactComponent() {
    const componentClassOrName = get(this, 'reactComponent');
    let componentClass;

    if (Ember.typeOf(componentClassOrName) === 'string') {
      componentClass = lookupFactory(this, `react-component:${componentClassOrName}`);
    } else {
      componentClass = componentClassOrName;
    }

    if (!componentClass) {
      throw new Error(`Could not find react component : ${componentClassOrName}`);
    }

    const props = getMutableAttributes(get(this, 'attrs'));

    ReactDOM.render(React.createElement(
      componentClass,
      props
    ), get(this, 'element'));
  },

  willDestroyElement: function() {
    ReactDOM.unmountComponentAtNode(get(this, 'element'));
  }
});

ReactComponent.reopenClass({
  // Some versions of Ember override positional param value to undefined when
  // a subclass is created using `Ember.extend({ reactComponent: foo })` so
  // instead store this value in a separate property.
  positionalParams: ['_reactComponent']
});

export default ReactComponent;

