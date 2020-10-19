import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { isMobile } from 'react-device-detect';
import more from 'highcharts/highcharts-more';

// init the module
if (typeof window !== `undefined`) {
  more(Highcharts);
}
function TimeTrendChart({ levels,overall,  data, colors, title, demo, axis }) {

const defaulthide = ["Hispanic/Latino", "All other races", "10th", "11th"]
  const chartRef = React.useRef();

  const overalldata = overall.map(data => {
    return [+data['year'], data.avg * 100];
})
.sort((a, b) => a[0] - b[0])
.map(d => {
  return [d[0], d[1]];
});
console.log('overalldata', overalldata)

  const [chartOption, setChartOption] = React.useState(null);
  const getDataLevels = level => {
    const output = data
      .filter(a => a.level === level)
      .map(data => {
          return [+data['year'], data.avg * 100];
 
      })
      .sort((a, b) => a[0] - b[0])
      .map(d => {
        return [d[0], d[1]];
      });

    return output;
  };

 

 

  React.useEffect(() => {
    setChartOption({
      tooltip: {
        borderColor: '#000000',
        backgroundColor: '#ffffff',

        shared: true,
        crosshairs: true,
      },

      chart: {

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
              var dataMax = this.series.dataMax;
              var dataMin = this.series.dataMin;

              if (this.y === dataMax || this.y === dataMin) {
      

                  const val = this.y;
                  return val.toFixed(0) + '%';
                
              }
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
        text: 'YRBS',
        href: 'ontopic.io',
      },
      title: {
        style: { fontSize: '16px' },
        align: 'center',
        margin: 0,
        text: title + " by <span style='font-style: italic; font-weight: bold; color: #8700f8'>" + demo + "</span>",
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
            from: 1991,
            to: 2000,
            color: '#f7f8ff',
 
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
            to: 2019,
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
          text: '% ' + axis,
          // offset: 20,
          style: {

            fontSize: '12px',
          },
        },

        type: 'linear',
        min: 0,

        labels: {
          enabled: !isMobile,
          formatter: function() {
  

              const val = this.value;
              return val.toFixed(0) + '%';
   
          },
        },
      },

      series: [
        {
          name: 'Overall',
          type: 'column',
          showInLegend: false,
          data: overalldata,
          color: "#e7e7e7",
          visible: true,
          tooltip: {
            valueDecimals: 2,
            headerFormat: '',
            useHTML: true,
            valueSuffix: '%', 
          },
        },
        ...levels.map((level, i) => {
          return {
            name: levels[i],
            visible: defaulthide.includes(levels[i]) ?  false : true,
            data: getDataLevels(level),
            color: colors[i],
            tooltip: {
              valueDecimals: 2,
              headerFormat: '',
              useHTML: true,

              valueSuffix: '%',
              
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
