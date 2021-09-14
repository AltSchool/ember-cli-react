import { classify } from '@ember/string';
import { typeOf } from '@ember/utils';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { get } from '@ember/object';
import React from 'react';
import ReactDOM from 'react-dom';
import YieldWrapper from './react-component/yield-wrapper';

import getMutableAttributes from 'ember-cli-react/utils/get-mutable-attributes';
import hasBlock from 'ember-cli-react/utils/has-block';
import lookupFactory from 'ember-cli-react/utils/lookup-factory';

const ReactComponent = Component.extend({
  /**
    The React component that this Ember component should wrap.

    @property reactComponent
    @type React.Component | Function | String
    @default null
   */
  reactComponent: reads('_reactComponent'),

  didRender: function() {
    this.renderReactComponent();
  },

  renderReactComponent() {
    const componentClassOrName = get(this, 'reactComponent');
    let componentClass;

    if (typeOf(componentClassOrName) === 'string') {
      componentClass = lookupFactory(
        this,
        `react-component:${componentClassOrName}`
      );

      // Set `displayName` so that it is visible in React devtools
      componentClass.displayName = classify(componentClassOrName);
    } else {
      componentClass = componentClassOrName;
    }

    if (!componentClass) {
      throw new Error(
        `Could not find react component : ${componentClassOrName}`
      );
    }

    const props = getMutableAttributes(get(this, 'attrs'));

    // Determine the children
    // If there is already `children` in `props`, we just pass it down (it can be function).
    // Otherwise we need to wrap the current `childNodes` inside a React component.
    // It is important that `childNodes` are reconstructed with `[...childNodes]` because
    // it is a `NodeList`-type object instead of Array in the first place.
    // Without reconstructing, `childNodes` will include the React component itself when
    // `componentDidMount` hook is triggerred.
    let children = props.children;
    if (!children) {
      const childNodes = get(this, 'element.childNodes');

      // In Ember 2.8, an empty comment node is still created for non-block form
      // component. This behavior breaks any component that does not expect
      // children to exist.
      // We can safely assume that there is no child node if:
      // - The component is not in block form
      // - There is no child node (of course)

      // For other cases, we need to create a YieldWrapper to hold the nodes
      if (hasBlock(this) && childNodes.length > 0) {
        children = [
          React.createElement(YieldWrapper, {
            key: get(this, 'elementId'),
            nodes: [...childNodes],
          }),
        ];
      }
    }

    ReactDOM.render(
      React.createElement(componentClass, props, children),
      get(this, 'element')
    );
  },

  willDestroyElement: function() {
    ReactDOM.unmountComponentAtNode(get(this, 'element'));
  },
});

ReactComponent.reopenClass({
  // Some versions of Ember override positional param value to undefined when
  // a subclass is created using `Ember.extend({ reactComponent: foo })` so
  // instead store this value in a separate property.
  positionalParams: ['_reactComponent'],
});

export default ReactComponent;
