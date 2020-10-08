import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
function VariableSummery({ metadata, data }) {
  const options = {
    chart: {
      type: 'column',
      //   marginLeft: i === 0 ? 100 : 10,
    },

    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },

    xAxis: {
      categories: data.map(d => d.level),
      //   labels: {
      //     enabled: i === 0,
      //   },
    },

    yAxis: {
      //   allowDecimals: false,
      title: {
        text: null,
      },
      //   min: 0,
      //   max: 10,
    },

    legend: {
      enabled: false,
    },

    series: [{ name: 'Count', data: data.map(d => [d.level, d.count]), color: 'black' }],
  };
  return (
    <div className="row">
      <div className="col-12 col-md-6 p-4">
        <p>{metadata.question_text}</p>
        <p>
          <ul>
            {data.map(d => (
              <li>{d.level}</li>
            ))}
          </ul>
        </p>
      </div>
      <div className="col-12 col-md-6">
        <HighchartsReact
          highcharts={Highcharts}
          containerProps={{ style: { height: '100%' } }}
          options={options}
        />
      </div>
    </div>
  );
}

export default VariableSummery;
