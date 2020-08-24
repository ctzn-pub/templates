import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_data from 'highcharts/modules/data';
import abortion_demographic from './data/raceChart.json';
import abortion_politics_data from './data/abortion_politics.json';
import { FaPlay, FaPause } from 'react-icons/fa';

import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

if (typeof Highcharts === 'object') {
  HC_data(Highcharts);
}

const startYear = 1977;
const endYear = 2018;

function RaceChart() {
  const chartRef = React.useRef();
  const btnRef = React.useRef();
  const inputRef = React.useRef();
  const selectedYearIndex = React.useRef(0);
  const [data, setData] = React.useState(null);
  const [years, setYears] = React.useState([]);
  const [levels, setLevels] = React.useState([]);
  const [chartOption, setChartOption] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState(startYear);

  React.useEffect(() => {
    const data = abortion_politics_data.data.gss_topics[0].gss_meta;
    const years = [...new Set(data[0].gss_timetrends.map(x => x.Year))];
    let demoLevels = [...new Set(data[0].gss_timetrends.map(x => x.DemographicLevel))];
    demoLevels = demoLevels.map(level => {
      const dataObj = data[0].gss_timetrends.find(x => x.DemographicLevel === level);
      return {
        level,
        color: dataObj.Color,
      };
    });
    setYears(years);
    setLevels(demoLevels);
    const chartData = data.map(variable => {
      const dataObj = { varname: variable.varname };

      variable.gss_timetrends.forEach(d => {
        if (dataObj[d.Year]) {
          dataObj[d.Year] = {
            ...dataObj[d.Year],
            [d.DemographicLevel]: d.Average * 100,
            overall: d.Overall * 100,
          };
        } else {
          dataObj[d.Year] = { [d.DemographicLevel]: d.Average * 100, overall: d.Overall * 100 };
        }
      });
      return dataObj;
    });

    // const chartData = abortion_demographic.map(variable => {
    //   const dataObj = { 'varname': variable.Short_Title };
    //   variable.gss_timetrends.forEach(({ Average, Overall, Year }) => {
    //     dataObj[Year] = { Average: Average * 100, Overall: Overall * 100 };
    //   });
    //   return dataObj;
    // });
    setData(chartData);
  }, []);

  const getDataOverall = year => {
    let output = data
      .map(d => {
        return [d['varname'], d[year].overall];
      })
      .sort((a, b) => b[1] - a[1]);
    return output.slice(1, 11);
  };
  const getDataLevels = (year, level) => {
    let output = data
      .map(data => {
        return [data['varname'], data[year][level]];
      })
      .sort((a, b) => b[1] - a[1]);
    return output.slice(1, 11);
  };

  React.useEffect(() => {
    if (btnRef.current)
      setChartOption({
        credits: {
          enabled: true,

          text: 'Data Source: General Social Survey',
          // href: "/source/gss",
          style: {
            fontSize: '10px',
            color: 'black',
            fontFamily: 'Times',
          },
        },

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
            pointWidth: 25,

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
          enabled: false,
          y: -20,
          x: 220,
          //  borderWidth: 1,

          layout: 'horizontal',
          //  align: "right",
          itemStyle: {
            fontSize: '14px',
            fontWeight: 'normal',
            fontFamily: 'Georgia',
          },
          itemMarginTop: 3,
          itemMarginBottom: 0,
          verticalAlign: 'top',
          floating: true,
          style: {
            fontSize: '1em',
          },
          //paddingTop: 5,
          // marginTop: 10,

          margin: 0,
          padding: 0,
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
            // colorByPoint: true,
            dataSorting: {
              enabled: true,
              matchByName: true,
            },
            color: '#e7e7e7',
            borderColor: 'transparent',
            type: 'bar',
            dataLabels: [
              {
                enabled: true,
              },
            ],
            name: years[selectedYearIndex.current],
            data: getDataOverall(years[selectedYearIndex.current]),
            // w: 10,
          },
          ...levels.map(({ level, color }) => {
            return {
              // colorByPoint: true,

              type: 'scatter',
              marker: {
                lineWidth: 0,
                fillColor: color,
                lineColor: null,
                radius: 7,
                symbol: 'circle',
                borderColor: 'transparent',
              },
              dataLabels: [
                {
                  enabled: false,
                },
              ],
              animation: true,
              name: years[selectedYearIndex.current],
              data: getDataLevels(years[selectedYearIndex.current], level),
            };
          }),
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
    // chartRef.current.update(
    //   {
    //     title: {
    //       useHTML: true,
    //       text: `<div>World population - overall: <b>${
    //         getData(years[selectedYearIndex.current])[0][1]
    //       }</b></span></div>`,
    //     },
    //   },
    //   false,
    //   false,
    //   false
    // );
    chartRef.current.series[0].update({
      name: years[selectedYearIndex.current],
      data: getDataOverall(years[selectedYearIndex.current]),
    });
    levels.map((d, i) => {
      chartRef.current.series[i + 1].update({
        name: years[selectedYearIndex.current],
        data: getDataLevels(years[selectedYearIndex.current], d.level),
      });
    });

    //   return {
    //     // colorByPoint: true,

    //     type: 'scatter',
    //     marker: {
    //       lineWidth: 2,
    //       fillColor: color,
    //       lineColor: null,
    //       radius: 7,
    //       symbol: 'circle',
    //       borderColor: 'transparent',
    //     },
    //     dataLabels: [
    //       {
    //         enabled: false,
    //       },
    //     ],
    //     animation: true,
    //     name: years[selectedYearIndex.current],
    //     data: getDataLevels(years[selectedYearIndex.current], level),
    //   };
    // }),

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

const years1 = [
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
