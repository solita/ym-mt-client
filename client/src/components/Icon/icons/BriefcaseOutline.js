import React from 'react';

const BriefcaseOutline = ({ color, size, title }) => (
  <svg
    version="1.1"
    id="BriefcaseOutline"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 91.01 77.6"
    height={size}
    width={size}
  >
    <defs>
      <style>
        {`
          path {
            stroke-miterlimit: 10;
            stroke-width: 2px;
          }
        `}
      </style>
    </defs>
    <title>{title}</title>
    <path
      fill="none"
      stroke={color}
      d="M41.5,41h8v8.89H90s-.66-19.82-.89-26c-.22-5.9-2.33-9.55-8.89-9.55H65.93l-5.32-10C59.13,1.54,58.63,1,55.36,1H35.65c-3.27,0-3.77.54-5.24,3.31l-5.32,10H10.82c-6.56,0-8.65,3.65-8.89,9.55s-.89,26-.89,26H41.5ZM35.05,9.52c1-1.92,1.37-2.29,3.63-2.29H52.33c2.26,0,2.61.37,3.63,2.29l2.56,4.82h-26ZM49.51,63.26h-8V54.37H3.26s.55,8,.89,14.78c.14,2.81,1,7.46,8,7.46H78.86c7,0,7.85-4.65,8-7.46.39-7,.89-14.78.89-14.78H49.51Z"
    />
  </svg>
);

export default BriefcaseOutline;
