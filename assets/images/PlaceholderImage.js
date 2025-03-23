import React from 'react';
import Svg, { Rect, Text } from 'react-native-svg';

export default function PlaceholderImage({ width, height, text }) {
  return (
    <Svg width={width} height={height}>
      <Rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#f4511e"
        opacity="0.2"
      />
      <Text
        x={width / 2}
        y={height / 2}
        fontSize={24}
        fill="#f4511e"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {text}
      </Text>
    </Svg>
  );
} 