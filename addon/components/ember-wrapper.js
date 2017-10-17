import React from 'npm:react';

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
class EmberWrapper extends React.Component {
  componentDidMount() {
    this.$el = window.$(this.el);
    this.$el.append(...this.props.nodes);
  }

  componentWillUnmount() {
  }

  render() {
    return React.createElement('span', {
      ref: el => this.el = el
    });
  }
}

export default EmberWrapper;
