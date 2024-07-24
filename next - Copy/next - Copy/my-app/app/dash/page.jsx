"use client";
import { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [layout, setLayout] = useState('layout1'); // Default layout state
  const [graphPositions, setGraphPositions] = useState([0, 1, 2, 3]); // Default positions for 4 graphs

  useEffect(() => {
    const storedArrangements = JSON.parse(localStorage.getItem('arrangemenents'));
    console.log('Stored Arrangements:', storedArrangements);

    if (storedArrangements && Array.isArray(storedArrangements) && storedArrangements.length > 0) {
      // Assuming `storedArrangements` is an array with one object
      const arrangement = storedArrangements[0];
      setGraphPositions([
        arrangement.position1,
        arrangement.position2,
        arrangement.position3,
        arrangement.position4,
      ]);
    } else {
      // Fallback to default values if data is not valid
      setGraphPositions([0, 1, 2, 3]); // or any default arrangement
    }
  }, []);

  const toggleLayout = () => {
    setLayout(layout === 'layout1' ? 'layout2' : 'layout1');
  };

  const getGraphComponent = (type) => {
    switch (type) {
      case 0:
        return <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />;
      case 1:
        return <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />;
      case 2:
        return <Pie data={pieData1} options={{ responsive: true, maintainAspectRatio: false }} />;
      case 3:
        return <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />;
      default:
        return <div className="h-full flex items-center justify-center">Invalid Graph Type</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-64 min-h-screen">
        <div className="p-4">
          <div className="mb-4">
            {/* Tab 1 */}
            <button className="text-left w-full px-4 py-2 bg-gray-800 text-white rounded-md mb-2">Tab 1</button>
            {/* Tab 2 */}
            <button className="text-left w-full px-4 py-2 bg-gray-800 text-white rounded-md mb-2">Tab 2</button>
          </div>
          <div>
            {/* Content for Tab 1 */}
            {layout === 'layout1' && (
              <div>
                <p className="text-sm">Content for Tab 1 - Layout 1</p>
              </div>
            )}
            {/* Content for Tab 2 */}
            {layout === 'layout1' && (
              <div>
                <p className="text-sm">Content for Tab 2 - Layout 1</p>
              </div>
            )}
            {/* Content for Tab 1 - Layout 2 */}
            {layout === 'layout2' && (
              <div>
                <p className="text-sm">Content for Tab 1 - Layout 2</p>
              </div>
            )}
            {/* Content for Tab 2 - Layout 2 */}
            {layout === 'layout2' && (
              <div>
                <p className="text-sm">Content for Tab 2 - Layout 2</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation bar */}
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">Dashboard NavBar</div>
        </header>

        {/* Main content area */}
        <main className="flex-1 bg-gray-100">
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Dashboard Main Content</h1>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={toggleLayout}>
                Switch Layout
              </button>
            </div>
            
            {/* Render graphs based on the selected arrangement */}
            <div className={`grid ${layout === 'layout1' ? 'grid-cols-2 gap-4' : 'grid-cols-1 gap-4'} p-4`}>
              {graphPositions.map((graphType, index) => (
                <div key={index} className={`bg-white p-4 rounded shadow-md ${layout === 'layout1' ? 'h-60' : 'h-96'}`}>
                  {console.log('Graph Type:', graphType)}
                  {graphType !== null ? getGraphComponent(graphType) : <div className="h-full flex items-center justify-center">Empty</div>}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const barData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const lineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales Data',
      data: [20, 14, 23, 25, 22, 18, 27],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      fill: true,
    },
  ],
};

const pieData1 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 14, 13, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default Dashboard;
