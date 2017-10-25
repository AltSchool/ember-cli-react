import React from 'npm:react';

export default function(props) {
  return <span>Warning: {props.children('supported but anti-pattern')}</span>;
}
