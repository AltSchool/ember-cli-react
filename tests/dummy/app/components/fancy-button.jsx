import React from 'react';

const FancyButton = props => {
  return (
    <button className="FancyButton" onClick={props.onClick}>
      Click
    </button>
  );
};

export default FancyButton;
