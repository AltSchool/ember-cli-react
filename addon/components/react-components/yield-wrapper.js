import React from "npm:react";

/**
 * A React component that is used to render HTML Nodes.
 *
 * The primary usage of this component is to support `props.children` in `react-component`.
 * The catch is that an additional `<span>` is introduced as a wrapper.
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

    this.el.appendChild(fragment);
  }

  componentWillUnmount() {}

  render() {
    return React.createElement("span", {
      ref: el => (this.el = el)
    });
  }
}

export default YieldWrapper;
