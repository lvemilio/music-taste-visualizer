import React from 'react';
import Highcharts from 'highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsReact from 'highcharts-react-official';

HighchartsHeatmap(Highcharts);

const SONG_PARAM = [
  'Valence',
  'Energy',
  'Danceability',
  'Tempo',
];

function parseData(playlistData) {
  var retVal = []
  for (var i = 0; i < playlistData.length; i++) {
    let songBlock = [];
    var j = 0;
    for (let category of SONG_PARAM) {
      songBlock = [i + 1, j, playlistData[i][category]]
      j++;
      retVal.push(songBlock)
    }
  }
  return retVal
}


export const PlaylistViz = ({ playlistProps }) => {

  const calculateAvgStat = (stat) => {
    let avgStat = 0
    playlistProps.forEach((track) => {
      avgStat += track[stat]
    })

    return avgStat / playlistProps.length
  }

  const options = {
    chart: {
      type: 'heatmap',
      plotBorderWidth: 1,
    },
    title: {
      text: 'Heatmap of playlist song parametrs',
      style: {
        fontSize: '20px',
        fontFamily: 'Baloo 2',
      },
    },
    xAxis: {
      min: 1,
      max: playlistProps.length,
      tickInterval: 1,
      gridLineWidth: 0,
      lineWidth: 0.5,
      lineColor: 'rgba(0,0,0,0.75)',
      tickWidth: 0,
      tickLength: 3,
      tickColor: 'rgba(0,0,0,0.75)',
      title: {
        text: 'Songs',
        style: {
          fontSize: '14px',
          fontFamily: 'Baloo 2',
        },
      },

    },
    yAxis: {
      categories: SONG_PARAM,
      title: 'Song parameters',
      labels: {
        style: {
          fontSize: '16px',
          fontFamily: 'Baloo 2',
        },
      },
    },
    tooltip: {
      formatter: function () {
        if (this.point.options.y === 3) {
          this.point.value = (this.point.options.value * 200).toFixed(0) + " BPM"
          this.point.avg = (calculateAvgStat('Tempo') * 200).toFixed(0) + " BPM"
        } else if (this.point.options.y === 2) {
          this.point.value = (this.point.options.value * 100).toFixed(1) + '%'
          this.point.avg = (calculateAvgStat('Danceability') * 100).toFixed(1) + "%"
        } else if (this.point.options.y === 1) {
          this.point.value = (this.point.options.value * 100).toFixed(1) + '%'
          this.point.avg = (calculateAvgStat('Energy') * 100).toFixed(1) + "%"
        } else if (this.point.options.y === 0) {
          this.point.value = (this.point.options.value * 100).toFixed(1) + '%'
          this.point.avg = (calculateAvgStat('Valence') * 100).toFixed(1) + "%"
        }
        return (
          '<b>Title: </b>' +
          playlistProps[this.point.x - 1]["Title"] +
          '<br /><b>Artist:</b> ' +
          playlistProps[this.point.x - 1]["Artist"] +
          '<br />' +
          '<b>Value:</b> ' + this.point.value +
          '<br />' +
          '<b>Average value:</b> ' + this.point.avg
        );
      },
    },
    colorAxis: {
      stops: [
        [0, '#C3DAC4'],
        [0.25, '#88B589'],
        [0.5, '#4C904E'],
        [0.75, '#2D692F'],
        [1.0, '#1C411D'],
      ],
      labels: {
        formatter: function () {
          if (this.pos === 0) {
            return '0%';
          } else if (this.pos === 0.25) {
            return '25%';
          } else if (this.pos === 0.5) {
            return '50%';
          } else if (this.pos === 0.75) {
            return '75%';
          } else if (this.pos === 1.0) {
            return '100%';
          }
        }
      }
    },

    series: [
      {
        name: 'Song data',
        borderWidth: 0.5,
        borderColor: 'white',
        dataLabels: {
          enabled: false,
          color: '#000000',
        },
        data: parseData(playlistProps)
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
