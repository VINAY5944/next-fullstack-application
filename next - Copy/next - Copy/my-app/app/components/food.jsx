"use client"
import React, { useState } from 'react';
import Highcharts from 'highcharts/highcharts'; // Importing highcharts for chart options
import HighchartsReact from 'highcharts-react-official'; // Wrapper for Highcharts in React
import highchartsMore from 'highcharts/highcharts-more'; // Import highcharts-more for additional chart types
highchartsMore(Highcharts); // Initialize highcharts-more

const MyDashboard = () => {
  const [colorMode, setColorMode] = useState('none'); // State for color mode

  // Dummy data for packedbubble chart
  const dummyData = [
    { name: 'Beef Liver', value: 6421 },
    { name: 'Lamb Liver', value: 2122 },
    { name: 'Cod Liver Oil', value: 1350 },
    { name: 'Mackerel', value: 388 },
    { name: 'Tuna', value: 214 }
  ];

  const handleColorModeChange = (e) => {
    setColorMode(e.target.value);
  };

  const highchartsOptions = {
    chart: {
      type: 'packedbubble',
      animation: false
    },
    title: {
      text: 'Vitamin A Content in Various Foods'
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} μg'
    },
    plotOptions: {
      packedbubble: {
        minSize: '40%',
        maxSize: '100%',
        zMin: 0,
        zMax: 10000,
        layoutAlgorithm: {
          gravitationalConstant: 0.02,
          splitSeries: false,
          seriesInteraction: false,
          dragBetweenSeries: false,
          parentNodeLimit: true
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: 250
          },
          style: {
            textOutline: 'none',
            fontWeight: 'normal'
          }
        }
      }
    },
    series: [{
      name: 'Vitamin A',
      data: dummyData.map(item => ({ name: item.name, value: item.value }))
    }]
  };

  return (
    <div>
      {/* Render HighchartsReact component */}
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...highchartsOptions,
          chart: {
            ...highchartsOptions.chart,
            className: colorMode === 'none' ? '' : `highcharts-${colorMode}`
          }
        }}
      />

      {/* Color mode switch inputs */}
      <div style={{ marginTop: '20px' }}>
      
      </div>
    </div>
  );
};

export default MyDashboard;
