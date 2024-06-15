import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


export default function PieActiveArc({ data }) {
  console.log(data)
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 5, additionalRadius: -5, color: 'gray' },
        },
      ]}
      height={200}
    />
  );
}