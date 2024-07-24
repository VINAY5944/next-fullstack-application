"use client"
import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock'; // Importing highstock for candlestick charts
import HighchartsReact from 'highcharts-react-official'; // Wrapper for Highcharts in React

const Stock= () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Function to fetch data asynchronously
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://demo-live-data.highcharts.com/aapl-ohlc.json'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Cleanup function (optional) if necessary
    return () => {
      // Cleanup code if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (data && chartRef.current) {
      // Create the stock chart using fetched data
      Highcharts.stockChart(chartRef.current, {
        plotOptions: {
          candlestick: {
            color: 'pink',
            lineColor: 'red',
            upColor: 'lightgreen',
            upLineColor: 'green'
          }
        },
        rangeSelector: {
          selected: 1
        },
        series: [{
          type: 'candlestick',
          name: 'AAPL Stock Price',
          data: data // Use fetched data here
        }]
      });
    }
  }, [data]); // Re-run effect when 'data' changes

  return (
    <div>
      {/* Ref for the container */}
      <div ref={chartRef}></div>

      {/* Render HighchartsReact wrapper component */}
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          // Optional: You can define additional options for the Highcharts chart here
        }}
      />
    </div>
  );
};

export default Stock;
