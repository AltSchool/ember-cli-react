import Ember from 'ember';
import React from 'npm:react';
import ReactDOM from 'npm:react-dom';

import getMutableAttributes from 'ember-react/utils/get-mutable-attributes';
import lookupFactory from 'ember-react/utils/lookup-factory';


const { get } = Ember;

const ReactComponent = Ember.Component.extend({
  /**
    The React component that this Ember component should wrap.

    @property reactComponent
    @type React.Component | Function | String
    @default null
   */
  reactComponent: null,

  didRender: function() {
    this.renderReactComponent();
  },

  renderReactComponent() {
    let componentClass = get(this, 'reactComponent');

    if (Ember.typeOf(componentClass) === 'string') {
      componentClass = lookupFactory(this, `react-component:${componentClass}`);
    }

    if (!componentClass) {
      throw new Error(`Could not find react component : ${componentClass}`);
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
  positionalParams: ['reactComponent']
});

export default ReactComponent;

