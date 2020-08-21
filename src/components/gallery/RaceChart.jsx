import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_data from 'highcharts/modules/data';
import abortion_demographic from './data/raceChart.json';
import { FaPlay, FaPause } from 'react-icons/fa';

import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

if (typeof Highcharts === 'object') {
  HC_data(Highcharts);
}

const startYear = 1972;
const endYear = 2018;

function RaceChart() {
  const chartRef = React.useRef();
  const btnRef = React.useRef();
  const inputRef = React.useRef();
  const selectedYearIndex = React.useRef(0);
  const [data, setData] = React.useState(null);
  const [chartOption, setChartOption] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState(startYear);

  React.useEffect(() => {
    const chartData = abortion_demographic.map(variable => {
      const dataObj = { 'Country Name': variable.Short_Title };
      variable.gss_timetrends.forEach(({ Average, Overall, Year }) => {
        dataObj[Year] = { Average: Average * 100, Overall: Overall * 100 };
      });
      return dataObj;
    });
    setData(chartData);
  }, []);

  const getData = (year, type) => {
    let output = data
      .map(data => {
        return [data['Country Name'], data[year][type]];
      })
      .sort((a, b) => b[1] - a[1]);
    return [output[0], output.slice(1, 11)];
  };
  React.useEffect(() => {
    if (btnRef.current)
      setChartOption({
        credits: { enabled: false },

        chart: {
          animation: {
            duration: false,
          },

          events: {
            render() {
              let chart = this;

              // Responsive input
              //   inputRef.current.style.width =
              //     chart.plotWidth -
              //     chart.legend.legendWidth +
              //     chart.plotLeft / 2 -
              //     10 +
              //     "px" // where 10 is a padding
            },
          },
          marginRight: 50,
        },
        plotOptions: {
          scatter: { animation: false },
          series: {
            animation: false,
            groupPadding: 0,
            pointPadding: 0.1,
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.0f} %',
            },
          },
        },

        title: {
          useHTML: true,
          text: ``,
        },

        legend: {
          align: 'right',
          verticalAlign: 'bottom',
          itemStyle: {
            fontWeight: 'bold',
            fontSize: '50px',
          },
          symbolHeight: 0.001,
          symbolWidth: 0.001,
          symbolRadius: 0.001,
          enabled: false,
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          opposite: true,
          title: {
            text: '',
          },
          // tickAmount: 10,
          labels: {
            formatter: function() {
              return this.value + ' %';
            },
          },
        },
        series: [
          {
            colorByPoint: true,
            dataSorting: {
              enabled: true,
              matchByName: true,
            },
            // color: '#e7e7e7',
            // borderColor: 'transparent',
            type: 'bar',
            dataLabels: [
              {
                enabled: true,
              },
            ],
            name: years[selectedYearIndex.current],
            data: getData(years[selectedYearIndex.current], 'Average')[1],
          },
          {
            // colorByPoint: true,

            type: 'scatter',
            marker: {
              lineWidth: 2,
              fillColor: '#f2f2f2',
              lineColor: null,
              radius: 5,
              symbol: 'circle',
            },
            dataLabels: [
              {
                enabled: false,
              },
            ],
            animation: true,
            name: years[selectedYearIndex.current],
            data: getData(years[selectedYearIndex.current], 'Overall')[1],
          },
        ],
      });
  }, [data]);
  const update = increment => {
    if (increment) {
      selectedYearIndex.current = selectedYearIndex.current + 1;
    }
    setSelectedYear(years[selectedYearIndex.current]);

    if (years[selectedYearIndex.current] >= endYear) {
      pause();
    }
    chartRef.current.update(
      {
        title: {
          useHTML: true,
          text: `<div>World population - overall: <b>${
            getData(years[selectedYearIndex.current])[0][1]
          }</b></span></div>`,
        },
      },
      false,
      false,
      false
    );
    chartRef.current.series[0].update({
      name: years[selectedYearIndex.current],
      data: getData(years[selectedYearIndex.current], 'Average')[1],
    });
    chartRef.current.series[1].update({
      name: years[selectedYearIndex.current],
      data: getData(years[selectedYearIndex.current], 'Overall')[1],
    });

    // chartRef.current.redraw(false);
  };

  function play() {
    if (selectedYear >= endYear) {
      setSelectedYear(startYear);
      selectedYearIndex.current = 0;
    }

    setIsPlaying(true);
    chartRef.current.sequenceTimer = setInterval(function() {
      update(1);
    }, 500);
  }

  function pause() {
    setIsPlaying(false);
    clearTimeout(chartRef.current.sequenceTimer);
    chartRef.current.sequenceTimer = undefined;
  }

  const handleBtnClick = e => {
    if (chartRef.current.sequenceTimer) {
      pause(e.target);
    } else {
      play(e.target);
    }
  };

  const handleInputClick = (e, newValue) => {
    setSelectedYear(newValue);
    selectedYearIndex.current = years.findIndex(v => v == newValue);
    update();
  };

  const marks = years.map(y => ({
    value: y,
    label: y % 10 === 0 || +y === startYear || +y === endYear ? y : '',
  }));

  if (data === null) return null;
  return (
    <div style={{ width: 800 }}>
      <Button
        ref={btnRef}
        onClick={handleBtnClick}
        title={isPlaying ? 'Pause' : 'Play'}
        variant="contained"
        disableElevation
        color="primary"
        size="large"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </Button>

      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOption}
          callback={chart => (chartRef.current = chart)}
        />
        <h1 style={{ textAlign: 'right', fontSize: '3rem' }}>{selectedYear}</h1>
      </div>
      <div
        id="play-controls"
        style={{
          marginTop: '2rem',
        }}
      >
        <div className="mx-5">
          <Slider
            value={+selectedYear}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={null}
            marks={marks}
            min={startYear}
            valueLabelDisplay="on"
            max={endYear}
            onChange={handleInputClick}
          />
        </div>
      </div>
    </div>
  );
}
// const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

export default RaceChart;

const years = [
  '1972',
  '1973',
  '1974',
  '1975',
  '1976',
  '1977',
  '1978',
  '1980',
  '1982',
  '1983',
  '1984',
  '1985',
  '1987',
  '1988',
  '1989',
  '1990',
  '1991',
  '1993',
  '1994',
  '1996',
  '1998',
  '2000',
  '2002',
  '2004',
  '2006',
  '2008',
  '2010',
  '2012',
  '2014',
  '2016',
  '2018',
];
