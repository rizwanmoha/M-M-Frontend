import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
    
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['December', 'January', 'february'] }]}
      series={[{ data: [4, 3, 6] }]}
      width={500}
      height={300}
      
    />
  );
}