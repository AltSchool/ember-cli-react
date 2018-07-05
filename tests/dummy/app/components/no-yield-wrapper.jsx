import React from 'react';

export default function NoYieldWrapper(props) {
  if (React.Children.count(props.children)) {
    throw new Error('There should be no child');
  }

  return <span>Rendered correctly</span>;
}
