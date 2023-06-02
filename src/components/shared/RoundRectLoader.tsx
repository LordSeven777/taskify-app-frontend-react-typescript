import React from 'react';
import ContentLoader, { type IContentLoaderProps } from 'react-content-loader';

interface RoundRectLoaderProps extends IContentLoaderProps {
  rectWidth: number;
  rectHeight: number;
}

export default function RoundRectLoader({
  rectHeight,
  rectWidth,
  ...props
}: RoundRectLoaderProps) {
  const viewBox = `0 0 ${rectWidth} ${rectHeight}`;

  return (
    <ContentLoader viewBox={viewBox} title="Loading ..." {...props}>
      <rect
        x={0}
        y={0}
        rx={rectHeight / 2}
        ry={rectHeight / 2}
        width={rectWidth}
        height={rectHeight}
      />
    </ContentLoader>
  );
}
