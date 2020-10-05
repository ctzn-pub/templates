import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { isMobile } from 'react-device-detect';

function TimeTrendChart({ levels, data, colors, unit, title, demo, yLabel }) {
  const chartRef = React.useRef();
  const [chartOption, setChartOption] = React.useState(null);
  const getDataLevels = level => {
    const output = data
      .filter(a => a.level === level)
      .map(data => {
        return [+data['year'], data.avg];
      })
      .sort((a, b) => a[0] - b[0])
      .map(d => {
        return [d[0], d[1]];
      });

    return output;
  };

  let unittype = 'line';

  if (unit == 'have') {
    unittype = 'area';
  }
  console.log('unittype', unittype);
  React.useEffect(() => {
    setChartOption({
      tooltip: {
        borderColor: '#000000',
        backgroundColor: '#ffffff',
      },

      chart: {
        type: unittype,

        events: {
          load: function() {
            this.series.forEach(function(s) {
              s.update({
                showInLegend: !!s.points.length,
              });
            });
          },
        },
        height: '550px',
        style: {
          fontFamily: 'Georgia',
        },
        backgroundColor: 'transparent',
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 400,
            },
            chartOptions: {
              yAxis: {
                tickLength: 0,
              },
            },
          },
        ],
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#ffffff',
          },
        },
        series: {
          states: {
            inactive: {
              opacity: 1,
            },
            hover: {
              opacity: 1,
            },
          },

          label: {
            enabled: false,
          },
          showInLegend: true,
        },
        scatter: {
          marker: {
            symbol: 'circle',
          },
        },
        line: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return '$' + this.y.toFixed(2);
            },
          },
          marker: {
            fillColor: '#FFFFFF',
            lineWidth: 2,
            lineColor: null, // inherit from series
            symbol: 'circle',
            radius: 3,
          },
          zIndex: 1,
        },
      },
      credits: {
        text: 'Survey of Consumer Finance',
        href: 'ontopic.io',
      },
      title: {
        style: { fontSize: '14px' },
        align: 'left',
        // margin: 0,
        text: title + ' by ' + demo + ' in thousands of 2019 dollars',
      },
      legend: {
        itemStyle: {
          color: '#333333',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'light',
          textOverflow: 'ellipsis',
        },

        title: {
          style: { fontSize: 12, fontWeight: 'light' },
          text: null,
        },
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        margin: 10,
        padding: 10,
        itemMarginTop: 0,
        itemMarginBottom: 10,
      },

      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        tickColor: '#737373',
        title: {
          style: {
            fontFamily: 'Georgia',
          },
        },
        labels: {
          style: {
            fontFamily: 'Georgia',
          },
        },
        type: 'linear',
        title: {
          text: 'Year',
        },
        plotBands: [
          {
            from: 1952,
            to: 1960,
            color: '#fffafe',
            //color: '#ffe6e6',

            label: {
              text: 'Eisenhower',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },

          {
            from: 1960,
            to: 1972,
            color: '#c5d8ff',
            label: {
              text: 'Kennedy/Johnson',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },

          {
            from: 1972,
            to: 1977,
            color: '#fffafe',
            ///   color: '#ffe6e6',

            label: {
              text: 'Nixon/Ford',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },
          {
            from: 1977,
            to: 1980,
            //  color: '#c5d8ff',
            color: '#f7f8ff',
            label: {
              text: 'Carter',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },
          {
            from: 1980,
            to: 1992,
            color: '#fffafe',
            //   color: '#ffe6e6',

            label: {
              text: 'Reagan/Bush1',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },
          {
            from: 1992,
            to: 2000,
            color: '#f7f8ff',
            //    color: '#c5d8ff',

            label: {
              text: 'Clinton',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },
          {
            from: 2000,
            to: 2008,
            color: '#fffafe',
            //      color: '#ffe6e6',

            label: {
              text: 'Bush2',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },
          {
            from: 2008,
            to: 2016,
            //     color: '#c5d8ff',

            color: '#f7f8ff',
            label: {
              text: 'Obama',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },
          {
            from: 2016,
            to: 2018,
            color: '#fffafe',
            //       color: '#ffe6e6',
            label: {
              text: 'Trump',
              align: 'left',
              x: 10,
              y: -5,
              rotation: -90,
              verticalAlign: 'bottom',
            },
          },
        ],
      },

      yAxis: {
        // visible: false,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        tickColor: '#737373',
        tickWidth: 1,
        gridLineColor: 'transparent',
        title: {
          style: {
            fontFamily: 'Georgia',
          },
        },

        title: {
          enable: false,
          text: yLabel,
          // offset: 20,
          style: {
            fontWeight: 'bold',
            fontSize: '12px',
          },
        },

        type: 'linear',
        min: 0,

        labels: {
          enabled: !isMobile,
          formatter: function() {
            return '$' + this.value.toFixed(0);
          },
        },
      },

      series: [
        ...levels.map((level, i) => {
          return {
            name: levels[i],
            data: getDataLevels(level),
            color: colors[i],
            tooltip: {
              valueDecimals: 2,
              headerFormat: '',
              useHTML: true,
              pointFormatter: function() {
                return `<b> ${this.x}</b>: ${' $'} ${this.y.toFixed(
                  0
                )} ${' (thousands of 2019 dollars)'}   <br>
                  <span style="color:${this.color}"> ● </span> ${this.series.name}<br> 
                  </b><br>
                  `;
              },
            },
          };
        }),
      ],
    });
  }, [data, levels]);

  const mortarboard = chart => {
    chartRef.current = chart;
  };

  if (data === null) return null;
  return (
    <div>
      <HighchartsReact
        containerProps={{
          width: '100%',
        }}
        highcharts={Highcharts}
        options={chartOption}
        //  callback={chart => (chartRef.current = chart)}
        callback={mortarboard}
      />
    </div>
  );
}

export default TimeTrendChart;
