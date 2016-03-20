import Ember from 'ember';
import React from 'npm:react';
import ReactDOM from 'npm:react-dom';

import getMutableAttributes from 'ember-react/utils/get-mutable-attributes';
import lookupFactory from 'ember-react/utils/lookup-factory';


const { get } = Ember;

const ReactComponent = Ember.Component.extend({
  // Name of react component to look up from `components/`
  reactComponentName: null,

  didRender: function() {
    this.renderReactComponent();
  },

  renderReactComponent() {
    const componentName = get(this, 'reactComponentName');
    const componentClass = lookupFactory(this, `component:${componentName}`);
    const props = getMutableAttributes(get(this, 'attrs'));

    if (!componentClass) {
      throw new Error(`Could not find react component : ${componentName}`);
    }

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
  positionalParams: ['reactComponentName']
});

export default ReactComponent;

