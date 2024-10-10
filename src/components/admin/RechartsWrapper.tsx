import React from 'react';
import { XAxis as OriginalXAxis, YAxis as OriginalYAxis } from 'recharts';

const withDefaultProps = (WrappedComponent: any, defaultProps: any) => {
  return (props: any) => {
    const newProps = { ...defaultProps, ...props };
    return <WrappedComponent {...newProps} />;
  };
};

export const XAxis = withDefaultProps(OriginalXAxis, {
  height: 60,
  axisLine: true,
  tickLine: true,
  scale: 'point',
  padding: { left: 10, right: 10 },
});

export const YAxis = withDefaultProps(OriginalYAxis, {
  width: 80,
  axisLine: true,
  tickLine: true,
});