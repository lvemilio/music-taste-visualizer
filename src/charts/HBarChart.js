import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const avgPartyData = [
  { name: 'Danceability', value: 0.716 },
  { name: 'Energy', value: 0.835 },
  { name: 'Valence', value: 0.541 },
  { name: 'Tempo', value: 126 },
];

const avgWorkoutData = [
  { name: 'Danceability', value: 0.734 },
  { name: 'Energy', value: 0.742 },
  { name: 'Valence', value: 0.475 },
  { name: 'Tempo', value: 128 },
];

const avgDinnerData = [
  { name: 'Danceability', value: 0.668 },
  { name: 'Energy', value: 0.624 },
  { name: 'Valence', value: 0.731 },
  { name: 'Tempo', value: 114 },
];

const HBarChart = ({ data }) => {
  const formatPercent = (tickItem) => {
    return `${(tickItem).toFixed(0)}%`;
  };

  // const formatAvg = ( buttonPress ) => {
  //   return retVal;
  // };

  const modifiedData = (data.val).map((item) => ({
    ...item,
    Value: (item.value * 100).toFixed(1),
  }));

  const [showAverage, setShowAverage] = useState([false, false, false]);

  const handleAveragePartyClick = () => {
    if (!showAverage[0]) {
      setShowAverage([true, false, false]);
    } else {
      setShowAverage([false, false, false]);
    }
  };

  const handleAverageWorkoutClick = () => {
    if (!showAverage[1]) {
      setShowAverage([false, true, false]);
    } else {
      setShowAverage([false, false, false]);
    }
  };
  const handleAverageDinnerClick = () => {
    if (!showAverage[2]) {
      setShowAverage([false, false, true]);
    } else {
      setShowAverage([false, false, false]);
    }
  };

  const chartData = showAverage[0]
    ? modifiedData.map((item) => {
      const avgItem = avgPartyData.find((avg) => avg.name === item.name);
      return {
        ...item,
        AvgValue: (avgItem ? avgItem.value : 0) * 100,
        label: 'Average Value'
      };
    })
    : showAverage[1] ? modifiedData.map((item) => {
      const avgItem = avgWorkoutData.find((avg) => avg.name === item.name);
      return {
        ...item,
        AvgValue: (avgItem ? avgItem.value : 0) * 100,
        label: 'Average Value'
      };
    })
      : showAverage[2] ? modifiedData.map((item) => {
        const avgItem = avgDinnerData.find((avg) => avg.name === item.name);
        return {
          ...item,
          AvgValue: (avgItem ? avgItem.value : 0) * 100,
          label: 'Average Value'
        };
      })
        : modifiedData;

  return (

    <div style={{ position: 'relative', fontSize: '15px' }}>
      <div style={{}}>
        <button onClick={handleAveragePartyClick} style={{
          backgroundColor: showAverage[0] ? '#1ED760' : 'rgb(19 132 59)',
          color: 'white',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          fontWeight: 'bold',
          transition: 'background-color 0.2s ease-in-out'
        }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1ED760'}
          onMouseOut={(e) => e.target.style.backgroundColor = showAverage[0] ? '#1ED760' : 'rgb(19 132 59)'}
        >
          Average Party Song
        </button>
        <button onClick={handleAverageWorkoutClick} style={{
          backgroundColor: showAverage[1] ? '#1ED760' : 'rgb(19 132 59)',
          color: 'white',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          fontWeight: 'bold',
          transition: 'background-color 0.2s ease-in-out'
        }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1ED760'}
          onMouseOut={(e) => e.target.style.backgroundColor = showAverage[1] ? '#1ED760' : 'rgb(19 132 59)'}
        >
          Average Workout Song
        </button>
        <button onClick={handleAverageDinnerClick} style={{
          backgroundColor: showAverage[2] ? '#1ED760' : 'rgb(19 132 59)',
          color: 'white',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          fontWeight: 'bold',
          transition: 'background-color 0.2s ease-in-out'
        }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1ED760'}
          onMouseOut={(e) => e.target.style.backgroundColor = showAverage[2] ? '#1ED760' : 'rgb(19 132 59)'}
        >
          Average Dinner Song
        </button>
      </div>
      <BarChart
        width={700}
        height={320}
        data={chartData}
        layout="vertical"
        margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
      >
        <XAxis type="number" domain={[0, 100]} tickFormatter={formatPercent} />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Value" fill="#1db954" />
        {showAverage[0] && <Bar dataKey="AvgValue" name="Average Party Song" fill="gray" />}
        {showAverage[1] && <Bar dataKey="AvgValue" name="Average Workout Song" fill="gray" />}
        {showAverage[2] && <Bar dataKey="AvgValue" name="Average Dinner Song" fill="gray" />}
      </BarChart>
      <div style={{ position: 'absolute', top: '45px', right: '10px', textAlign: 'right' }}>
        <h3 style={{ margin: '0' }}>Tempo: {data.tempo} BPM</h3>
        {showAverage[0] && <h3 style={{ margin: '0' }}>Average Party Song Tempo: {avgPartyData[3].value} BPM</h3>}
      </div>
      <div style={{ position: 'absolute', top: '45px', right: '10px', textAlign: 'right' }}>
        <h3 style={{ margin: '0' }}>Tempo: {data.tempo} BPM</h3>
        {showAverage[1] && <h3 style={{ margin: '0' }}>Average Workout Song Tempo: {avgWorkoutData[3].value} BPM</h3>}
      </div>
      <div style={{ position: 'absolute', top: '45px', right: '10px', textAlign: 'right' }}>
        <h3 style={{ margin: '0' }}>Tempo: {data.tempo} BPM</h3>
        {showAverage[2] && <h3 style={{ margin: '0' }}>Average Dinner Song Tempo: {avgDinnerData[3].value} BPM</h3>}
      </div>
    </div>
  );
};

export default HBarChart;