import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const avgData = [
  { name: 'Danceability', value: 0.5 },
  { name: 'Energy', value: 0.8 },
  { name: 'Valence', value: 0.4 },
];

const HBarChart = ({ data }) => {
  const formatPercent = (tickItem) => {
    return `${(tickItem).toFixed(0)}%`;
  };

  const modifiedData = (data.val).map((item) => ({
    ...item,
    Value: (item.value * 100).toFixed(1),
  }));

  const [showAverage, setShowAverage] = useState(false);

  const handleAverageClick = () => {
    console.log("Data: ", data)
    setShowAverage(!showAverage);
  };

  const chartData = showAverage
    ? modifiedData.map((item) => {
      const avgItem = avgData.find((avg) => avg.name === item.name);
      return {
        ...item,
        AvgValue: (avgItem ? avgItem.value : 0) * 100,
      };
    })
    : modifiedData;

  return (
    <div style={{ position: 'relative', fontSize: '15px' }}>
      <button onClick={handleAverageClick}>Toggle Average</button>
      <BarChart
        width={600}
        height={300}
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
      >
        <XAxis type="number" domain={[0, 100]} tickFormatter={formatPercent} />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Value" fill="#1db954" />
        {showAverage && <Bar dataKey="AvgValue" fill="gray" />}
      </BarChart>
      <div style={{ position: 'absolute', top: '0px', right: '10px' }}>
        <h3>Tempo: {data.tempo} BPM</h3>
      </div>
    </div>
  );
};

export default HBarChart;