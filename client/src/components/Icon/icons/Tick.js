import React from 'react';

const Tick = ({ color, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 34 27"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    id="Tick"
    x="0px"
    y="0px"
  >
    <polygon
      id="Tick"
      fill={color}
      points="0 16.6601562 3.3203125 13.3007812 10 20 30 0 33.3398438 3.3203125 10 26.6601562"
    />
  </svg>
);

export default Tick;
