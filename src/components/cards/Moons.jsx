import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import Plot from './../../images/strip.png';
import { useStaticQuery, StaticQuery, graphql } from 'gatsby';

function Moons() {
  const curC = 'IND';
  const data2 = useStaticQuery(graphql`
    query {
      hasura {
        cia_comparison(where: { birth_rate: { _is_null: false } }) {
          country
          iso_3
          birth_rate
        }
      }
    }
  `);
  //console.log('Data', Data);

  // var ranked = data2.hasura.cia_comparison.map(function(item, i) {
  //   if (i > 0) {
  //     //Get our previous list item
  //     var prevItem = data2.hasura.cia_comparison[i - 1];
  //     if (prevItem.birth_rate == item.birth_rate) {
  //       //Same score = same rank
  //       item.rank = prevItem.rank;
  //     } else {
  //       //Not the same score, give em the current iterated index + 1
  //       item.rank = i + 1;
  //     }
  //   } else {
  //     //First item takes the rank 1 spot
  //     item.rank = 1;
  //   }

  //   return item;
  // });

  const DataOb = [
    {
      data: data2.hasura.cia_comparison.map(item => {
        return {
          name: item.country,
          name2: item.iso_3,
          x: item.birth_rate,
          y: 0,
          rank: item.rank,
        };
      }),
    },
  ];

  console.log('hi');
  return (
    <div>
      {' '}
      <div
        style={{
          maxWidth: '350px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '50px',
            // backgroundColor: 'skyblue',
          }}
        >
          {' '}
          <h3>India</h3>
          <strong style={{ float: 'left', fontFamily: 'Arial', color: 'rgba(0, 104, 179, 0.98)' }}>
            Birth Rate
          </strong>
          <strong style={{ float: 'right', fontFamily: 'Arial', color: 'rgba(0, 104, 179, 0.98)' }}>
            66<sup>th</sup>
          </strong>
          <ResponsiveScatterPlot
            colors={node => {
              return node.name2 == curC ? 'rgba(0, 104, 179, 0.98)' : 'rgba(168, 219, 255, 0.08)';
            }}
            theme={{
              background: '#ffffff',
              textColor: '#333333',
              grid: {
                line: {
                  stroke: 'rgba(168, 219, 255, 1)',
                  strokeWidth: 1,
                },
              },
            }}
            tooltip={({ node }) => (
              <div
                style={{
                  //color: node.style.color,
                  color: '#fff',
                  fontSize: '8',
                  fontFamily: 'Arial',
                  background: '#000',
                  padding: '3px 3px',
                }}
              >
                {node.data.name}

                {`: ${node.data.x}`}
                <br />
              </div>
            )}
            data={DataOb}
            nodeSize={18}
            enableGridX={false}
            enableGridY={true}
            gridYValues={[0]}
            margin={{ top: 0, right: 15, bottom: 0, left: 15 }}
            xScale={{ type: 'linear', min: 0, max: 'auto' }}
            yScale={{ type: 'linear', min: -1, max: 1 }}
            blendMode="multiply"
            axisTop={null}
            axisRight={null}
            // axisBottom={{
            //   orient: 'bottom',
            //   tickSize: 0,
            //   tickPadding: 0,
            //   tickRotation: 0,

            //   format: () => null,
            // }}
            axisBottom={null}
            axisLeft={{
              orient: 'left',
              tickSize: 0,
              tickPadding: 0,
              tickRotation: 0,
              format: () => null,
            }}
          />
        </div>
      </div>
      <br></br>
      <div style={{ height: '100px' }}></div>
      Inspired by <a src="https://www.prosperity.com/globe/united-states">Prosperity Index</a>
      <br></br>
      <img
        style={{
          maxWidth: '400px',
        }}
        src={Plot}
        alt="A dog smiling in a party hat"
      />
    </div>
  );
}

export default Moons;
