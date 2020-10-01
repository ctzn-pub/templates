import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import more from 'highcharts/highcharts-more';

// init the module
if (typeof window !== `undefined`) {
  HC_exporting(Highcharts);
  more(Highcharts);
}

function MarginalEffect({ data, demo, axislabel, variable, mobile = false }) {
  //const axislabel = variable;

  const chartData = data.map(level => ({
    high: level.conf_high * 100,
    low: level.conf_low * 100,
    y: level.y * 100,
    label: level.group,
    name: level.labels,
    //order: level.x,

    order: level.demoByLabelsDemo.order,
  }));

  const options = {
    subtitle: {
      style: {
        fontFamily: 'Georgia',
      },
    },
    legend: {
      itemStyle: { fontSize: 10 },

      title: {
        style: { fontSize: 12 },
        text: null,
      },
      layout: 'horizontal',

      align: 'center',
      verticalAlign: 'top',
      margin: 0,
      padding: 0,
      itemMarginTop: 0,
      itemMarginBottom: 10,
    },
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)',
    chart: {
      height: mobile ? '350' : '250',
      style: {
        fontFamily: 'Georgia',
      },
      backgroundColor: 'transparent',
    },
    colors: ['#000'],
    title: {
      style: {
        fontFamily: 'Georgia',
        fontSize: 12,
      },
      text: '',
      align: 'center',
    },
    yAxis: {
      gridLineColor: '#e7e7e7',
      lineColor: '#e7e7e7',
      minorGridLineColor: '#e7e7e7',
      tickColor: '#e7e7e7',
      tickWidth: 1,
      title: {
        text: 'Predicted ' + axislabel,
        style: {
          fontFamily: 'Georgia',
          fontSize: 10,
        },
      },
      type: 'linear',
      labels: {
        style: {
          fontFamily: 'Georgia',
          fontSize: 8,
        },
        //    format: "%",
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
        },
        label: {
          enabled: false,
        },
      },
      scatter: {
        marker: {
          symbol: 'circle',
        },
      },
    },
    series: [
      {
        id: demo,
        name: demo,
        type: 'scatter',
        //   color: colors[i],
        data: chartData,
      },
      {
        id: demo + 'err',
        name: demo,
        type: 'errorbar',
        //   color: colors[i],
        data: chartData,
      },
    ],
    xAxis: {
      gridLineWidth: 1,
      gridLineColor: '#e7e7e7',
      lineColor: '#e7e7e7',
      minorGridLineColor: '#e7e7e7',
      tickColor: '#e7e7e7',
      tickWidth: 1,
      labels: {
        style: {
          fontFamily: 'Georgia',
          fontSize: 10,
        },
      },
      title: {
        text: '',
      },

      type: 'category',
    },

    tooltip: {
      crosshairs: {
        enabled: true,
        color: 'rgba(43,144,143,0.15)',
      },

      valueDecimals: 0,

      style: { fontSize: 10 },
      backgroundColor: '#fff',
      borderColor: '#8085e8',

      headerFormat: '<b>Predicted % ' + axislabel + '<br>{point.key}</b> ',

      pointFormat: `& {point.label}: {point.y}%`,
    },
  };
  return (
    <div
      className="w-100"
      style={{
        margin: 'auto',
        marginBottom: '50px',
        minWidth: '250px',
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        // containerProps={{ style: { height: '100%' } }}
        options={options}
      />
    </div>
  );
}

export default MarginalEffect;
