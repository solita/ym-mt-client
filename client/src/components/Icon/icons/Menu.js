import React from 'react';

const Menu = ({ color, size }) => (
  <svg
    version="1.1"
    id="Menu"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 20 20"
    height={size}
    width={size}
  >
    <path
      fill={color}
      d="M16.4,9H3.6C3.048,9,3,9.447,3,10c0,0.553,0.048,1,0.6,1h12.8c0.552,0,0.6-0.447,0.6-1S16.952,9,16.4,9z M16.4,13H3.6C3.048,13,3,13.447,3,14c0,0.553,0.048,1,0.6,1h12.8c0.552,0,0.6-0.447,0.6-1S16.952,13,16.4,13z M3.6,7h12.8 C16.952,7,17,6.553,17,6s-0.048-1-0.6-1H3.6C3.048,5,3,5.447,3,6S3.048,7,3.6,7z"
    />
  </svg>
);

export default Menu;
