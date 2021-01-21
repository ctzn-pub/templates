import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

function NivoLineChart() {
  const data = [
    {
      id: 'japan',
      color: 'hsl(227, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 45,
        },
        {
          x: 'helicopter',
          y: 58,
        },
        {
          x: 'boat',
          y: 77,
        },
        {
          x: 'train',
          y: 77,
        },
        {
          x: 'subway',
          y: 143,
        },
        {
          x: 'bus',
          y: 123,
        },
        {
          x: 'car',
          y: 44,
        },
        {
          x: 'moto',
          y: 101,
        },
        {
          x: 'bicycle',
          y: 173,
        },
        {
          x: 'horse',
          y: 215,
        },
        {
          x: 'skateboard',
          y: 100,
        },
        {
          x: 'others',
          y: 34,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(61, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 40,
        },
        {
          x: 'helicopter',
          y: 82,
        },
        {
          x: 'boat',
          y: 221,
        },
        {
          x: 'train',
          y: 110,
        },
        {
          x: 'subway',
          y: 279,
        },
        {
          x: 'bus',
          y: 89,
        },
        {
          x: 'car',
          y: 6,
        },
        {
          x: 'moto',
          y: 133,
        },
        {
          x: 'bicycle',
          y: 260,
        },
        {
          x: 'horse',
          y: 106,
        },
        {
          x: 'skateboard',
          y: 236,
        },
        {
          x: 'others',
          y: 223,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(58, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 293,
        },
        {
          x: 'helicopter',
          y: 183,
        },
        {
          x: 'boat',
          y: 78,
        },
        {
          x: 'train',
          y: 247,
        },
        {
          x: 'subway',
          y: 98,
        },
        {
          x: 'bus',
          y: 165,
        },
        {
          x: 'car',
          y: 181,
        },
        {
          x: 'moto',
          y: 20,
        },
        {
          x: 'bicycle',
          y: 122,
        },
        {
          x: 'horse',
          y: 83,
        },
        {
          x: 'skateboard',
          y: 228,
        },
        {
          x: 'others',
          y: 6,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(5, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 143,
        },
        {
          x: 'helicopter',
          y: 9,
        },
        {
          x: 'boat',
          y: 94,
        },
        {
          x: 'train',
          y: 247,
        },
        {
          x: 'subway',
          y: 99,
        },
        {
          x: 'bus',
          y: 213,
        },
        {
          x: 'car',
          y: 194,
        },
        {
          x: 'moto',
          y: 248,
        },
        {
          x: 'bicycle',
          y: 97,
        },
        {
          x: 'horse',
          y: 127,
        },
        {
          x: 'skateboard',
          y: 256,
        },
        {
          x: 'others',
          y: 213,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(102, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 282,
        },
        {
          x: 'helicopter',
          y: 128,
        },
        {
          x: 'boat',
          y: 262,
        },
        {
          x: 'train',
          y: 125,
        },
        {
          x: 'subway',
          y: 132,
        },
        {
          x: 'bus',
          y: 278,
        },
        {
          x: 'car',
          y: 184,
        },
        {
          x: 'moto',
          y: 242,
        },
        {
          x: 'bicycle',
          y: 145,
        },
        {
          x: 'horse',
          y: 203,
        },
        {
          x: 'skateboard',
          y: 7,
        },
        {
          x: 'others',
          y: 298,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Line Chart in Nivo</h1>
      <h2>This should work</h2>
      <div style={{ height: '400px' }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />{' '}
      </div>
      <p>Where is my line chart?</p>
    </div>
  );
}

export default NivoLineChart;
