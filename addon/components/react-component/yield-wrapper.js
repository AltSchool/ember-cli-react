import React from 'npm:react';

/**
 * A React component that is used to render HTML Nodes.
 *
 * The primary usage of this component is to support `props.children` in `react-component`.
 * The catch is that if the children is unstable, they need to be wrapped in a stable tag
 * (e.g. div) to make Glimmer happy.
 * See: https://github.com/yapplabs/ember-wormhole/issues/66#issuecomment-263575168
 *
 * Note that although this is possible, it should be used as a tool to migrate Ember to React
 * without the hard requirement to start with leaf components. It is highly recommended to
 * have clean React component tree whenever possible.
 *
 * Integration guide: https://reactjs.org/docs/integrating-with-other-libraries.html
 */
class YieldWrapper extends React.Component {
  componentDidMount() {
    // Different with the integration guide, we avoid jQuery here
    const fragment = document.createDocumentFragment();
    for (let node of this.props.nodes) {
      fragment.appendChild(node);
    }

    // This replace the original DOM element
    this.el.parentNode.replaceChild(fragment, this.el);
  }

  componentWillUnmount() {}

  render() {
    // This element is temporary. When this is mounted,
    // it will be replaced by the children nodes, handled by Ember.
    return React.createElement('span', {
      ref: el => (this.el = el)
    });
  }
}

export default YieldWrapper;
