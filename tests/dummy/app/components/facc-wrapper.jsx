import React from 'react';

const FaccWrapper = props => {
  return <span>Warning: {props.children('supported but anti-pattern')}</span>;
};

export default FaccWrapper;
