import React from 'react';

const Document = ({ color, size }) => (
  <svg
    version="1.1"
    id="Document"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 20 20"
    height={size}
    width={size}
  >
    <path
      fill={color}
      d="M16,1H4C3.447,1,3,1.447,3,2v16c0,0.552,0.447,1,1,1h12c0.553,0,1-0.448,1-1V2C17,1.448,16.553,1,16,1z M15,17H5V3h10V17z M13,5H7v2h6V5z M13,13H7v2h6V13z M13,9H7v2h6V9z"
    />
  </svg>
);

export default Document;
