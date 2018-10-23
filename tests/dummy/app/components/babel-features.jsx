import React from 'react';

class State {
  message = 'supports class properties';
}

export default function BabelFeatures() {
  let attrs = { 'data-test': 'allows-object-spread' };
  let s = new State();
  return <div {...attrs}>{s.message}</div>;
}
