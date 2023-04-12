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
            songBlock = [i, j, playlistData[i][category]]
            j++;
            retVal.push(songBlock)
        }
    }
    console.log(retVal);
    return retVal
}


export const PlaylistViz = ({ playlistProps }) => {
    console.log("Op", playlistProps)

const options = {
  chart: {
    type: 'heatmap',
    plotBorderWidth: 1,
  },
  title: {
    text: 'Heatmap of playlist song parametrs',
  },
  xAxis: {
    min: 0,
    max: playlistProps.length - 1,
    tickInterval: 1,
    labels: {
      step: 1,
      style: {
        fontSize: '14px',
        fontFamily: 'Open Sans',
      },
    },
    gridLineWidth: 0,
    lineWidth: 0.5,
    lineColor: 'rgba(0,0,0,0.75)',
    tickWidth: 0,
    tickLength: 3,
    tickColor: 'rgba(0,0,0,0.75)',
    title: {
      text: 'Songs',
    },
  },
  yAxis: {
    categories: SONG_PARAM,
    title: 'Song parameters',
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: 'Open Sans',
      },
    },
  },
  tooltip: {
    formatter: function () {
      return (
        '<b>Title: </b>' +
        playlistProps[this.point.x]["Title"] +
        '<br /><b>Artist:</b> ' +
        playlistProps[this.point.x]["Artist"] +
        '<br />' +
        '<b>Value:</b> ' +
        this.point.value
      );
    },
  },
  colorAxis: {
    stops: [
      [0, 'rgba(56, 7, 84, 0.4)'],
      [0.5, 'rgba(56, 7, 84, 0.65)'],
      [1, 'rgba(69, 9, 104, 1)'],
    ],
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
      // [
      //   [0, 2, 100],
      //   [4, 3, 200],
      //   [12, 1, 600],
      //   [10, 0, 700],
      // ],
    },
  ],
};

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
