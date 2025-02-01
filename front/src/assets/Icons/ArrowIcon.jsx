import React from "react";

const CustomSVG = ({ width = 50, height = 50, color = "white" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_238_1174)">
        <path
          d="M14.6549 36.5973L33.6138 21.2392L33.308 35.5422L37.8058 35.6398L38.2572 14.582L17.5643 10.6527L16.7262 15.0728L30.7812 17.7425L11.8223 33.1007L14.6549 36.5973Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_238_1174">
          <rect
            width="36"
            height="36"
            fill={color}
            transform="translate(22.8203 50.252) rotate(-129.01)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CustomSVG;
