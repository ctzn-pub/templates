import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
// import "../highcharts.css"
if (typeof window !== `undefined`) {
  more(Highcharts);
}
class DemoChart extends Component {
  render() {
    const { isBinary, axislabel } = this.props;

    const levelmeta = {
      'High Income': '#55af6e',
      'Low Income': '#000000',
      'College graduate+': '#af00c7',
      'H.S. graduate or less': '#000000',
      'Weekly+': '#a7c700',
      Rarely: '#000000',
      '65+': '#000000',
      '18-29': '#e69f00',
      Liberal: '#0000ff',
      Conservative: '#ee0303',
      Republican: '#ee0303',
      Democrat: '#0000ff',
      Metropolitan: '#000000',
      'Non-metropolitan': '#55af6e',
      Male: '#000000',
      Female: '#e69f00',
      Married: '#ee0303',
      'Never been married': '#000000',
      White: '#000000',
      'Non-white': '#e69f00',
    };
    console.log(levelmeta['High Income']);
    const chartOptions = {
      credits: { enabled: false },
      exporting: { enabled: false },
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

      plotOptions: {
        bar: {
          pointPadding: 0,
          pointWidth: 15,
          groupPadding: 0.5,
          borderWidth: 0.25,
        },

        bubble: {
          maxSize: 24,
        },

        series: {
          states: {
            inactive: {
              opacity: 1,
            },
          },
          label: { enabled: false },
          turboThreshold: 0,
          showInLegend: true,
        },
      },

      chart: {
        height: '550px',
        backgroundColor: 'transparent',
        type: 'bar',
        style: {
          width: '100%',
          fontFamily: 'Georgia',
        },
      },

      series: [
        {
          name: 'Overall Average',
          data: this.props.overall.map(d => ({
            ...d,
            name: d.question_rec,
          })),
          type: 'column',
          color: '#e7e7e7',
          borderColor: 'transparent',
        },
        ...this.props.levels.map((level, i) => ({
          name: level,
          color: levelmeta[level],
          data: this.props.demos
            .filter(d => d.demometum.dmeta === this.props.rank.display_name && d.level === level)
            .map(d => ({
              ...d,
              name: d.question_rec,
            })),
          type: 'bubble',
          size: 5,
          marker: {
            //lineWidth: 2,
            fillOpacity: 0.6,
            //    fillColor: "#f2f2f2",
            // fillColor: null,
            // fillOpacity: 0.1,
            // lineColor: null,
            // radius: 5,
            // symbol: "circle",
          },
          tooltip: {
            valueDecimals: 2,
            headerFormat: '',
            useHTML: true,
            pointFormatter: function() {
              return `
              <span> ${this.question_rec}<br /> ● </span> ${this.series.name}: <b> ${
                isBinary ? this.y.toFixed(2) + '%' : this.y.toFixed(2)
              }
              </b><br>
              `;
            },
          },
        })),
      ],

      title: {
        margin: 2,
        text: this.props.title + ' by ' + this.props.rank.display_name,
      },

      yAxis: {
        title: {
          text: isBinary ? axislabel : 'Average ' + this.props.title,
        },
        labels: {
          enabled: !isBinary,
        },
        startOnTick: false,
        tickInterval: 1,
        gridLineColor: 'transparent',
      },
      xAxis: {
        gridLineColor: 'transparent',
        lineWidth: 0,
        minorGridLineWidth: 0,
        tickWidth: 1,
        lineColor: 'transparent',
        tickColor: '#737373',
        title: { text: ' ' },
        type: 'category',
      },
      tooltip: {
        valueDecimals: 2,
        useHTML: true,
      },
    };

    return (
      <>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{
            width: '100%',
          }}
        />
      </>
    );
  }
}

export default DemoChart;
