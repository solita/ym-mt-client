import React from 'react';

const BellOutline = ({ color, size, title }) => (
  <svg
    version="1.1"
    id="BellOutline"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 73.16 80.73"
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
      d="M57.26,33.75C47.12,11.93,41.85,3.64,25.28,4c-5.9.12-4.48-4.27-9-2.61s-.64,4.11-5.24,7.88C-1.85,19.86-.66,29.66,5.32,53,7.85,62.86-.76,63.34,2.65,72.88c2.48,7,20.81,9.87,40.14,2.69s31.53-21.41,29-28.36C68.43,37.67,61.53,42.94,57.26,33.75ZM40.69,69.7c-17.26,6.41-31.45,2.64-32.05,1-1-2.89,5.57-12.52,25.31-19.85s30.75-4.61,31.91-1.38C66.53,51.34,58,63.29,40.69,69.7ZM37.14,54.16c-9,3.35-15.3,7.18-19.36,10.63C20.64,67.38,26,68,31.33,66c6.79-2.52,11-8.3,9.31-12.92,0-.06,0-.11-.07-.16Q38.9,53.51,37.14,54.16Z"
    />
  </svg>
);

export default BellOutline;
