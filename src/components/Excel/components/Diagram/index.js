import React from 'react';

import { ComposedChart, Line, BarChart, Bar, ReferenceLine, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend } from 'recharts';

export default function ({ data }) {
  return (
    <ComposedChart width={ 600 } height={ 300 } data={ data } stackOffset="sign"
                   margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
      <XAxis dataKey="Values"/>
      <YAxis/>

      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Bar dataKey="value" fill="#82ca9d" stackId="stack" />
      <ReferenceLine y={0} stroke='#000'/>
    </ComposedChart >
  );
}
