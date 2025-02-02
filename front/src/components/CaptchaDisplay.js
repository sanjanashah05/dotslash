import React from 'react';

const CaptchaDisplay = ({ text }) => {
  const width = 200;
  const height = 60;
  const baseSize = 24;

  // Generate random lines
  const generateLines = () => {
    const lines = [];
    for (let i = 0; i < 5; i++) {
      lines.push({
        x1: Math.random() * width,
        y1: Math.random() * height,
        x2: Math.random() * width,
        y2: Math.random() * height,
      });
    }
    return lines;
  };

  // Generate character positions and transformations
  const generateCharacters = () => {
    return text.split('').map((char, index) => {
      const x = (width / (text.length + 1)) * (index + 1);
      const y = height / 2 + (Math.random() * 10 - 5);
      const rotation = Math.random() * 40 - 20;
      const fontSize = baseSize + Math.random() * 8 - 4;
      
      return {
        char,
        x,
        y,
        rotation,
        fontSize,
      };
    });
  };

  const lines = generateLines();
  const characters = generateCharacters();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="bg-gray-800 rounded-md"
    >
      {/* Background noise */}
      <filter id="noise">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.7"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1" />

      {/* Distortion lines */}
      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}

      {/* Characters */}
      {characters.map((char, index) => (
        <text
          key={index}
          x={char.x}
          y={char.y}
          fontSize={char.fontSize}
          fontFamily="monospace"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${char.rotation}, ${char.x}, ${char.y})`}
        >
          {char.char}
        </text>
      ))}
    </svg>
  );
};

export default CaptchaDisplay;