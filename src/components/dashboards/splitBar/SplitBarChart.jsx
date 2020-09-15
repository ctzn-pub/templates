import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

function RaceChart({ levels, data, colors, title, demo, overall, yLabel, source }) {
  const chartRef = React.useRef();
  const [chartOption, setChartOption] = React.useState(null);

  const getDataOverall = () => {
    return overall.map(label => {
      return [label.combo_lab, label.avg];
    });
    //   .sort((a, b) => b[1] - a[1]);
  };

  const getDataLevels = level => {
    let output = data
      .filter(a => a.level === level)
      .map(data => {
        return [data['combo_lab'], data.avg];
      })
      .sort((a, b) => b[1] - a[1])
      .map(data => {
        return { name: data[0], y: data[1] };
      });
    return output;
  };
  React.useEffect(() => {
    setChartOption({
      credits: {
        enabled: true,

        text: `Data Source: ${source}`,
        // href: "/source/gss",
        style: {
          fontSize: '10px',
          color: 'black',
          fontFamily: 'Times',
        },
      },

      chart: {
        style: {
          fontFamily: 'Georgia',
        },

        events: {
          load: function() {
            this.series.forEach(function(s) {
              s.update({
                showInLegend: !!s.points.length,
              });
            });
          },
        },
      },

      plotOptions: {
        bar: {
          pointPadding: 0,
          groupPadding: 0.02,
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
          label: { enabled: false },
          turboThreshold: 0,
          showInLegend: true,
        },
      },

      title: {
        style: { fontSize: '14px' },
        align: 'left',
        margin: 0,
        text: title + ' (by ' + demo + ')',
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
          //  (isBinary ? "% " : "") +
          //   this.props.rank.demographics_metum.sitewide_demographic,
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
        type: 'category',
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',

        //  minorTickLength: 0,
      },
      yAxis: {
        // opposite: true,
        title: {
          text: yLabel,
        },
        gridLineColor: 'transparent',
        tickInterval: 25,
        tickColor: '#9f9f9f',
        tickWidth: 1,

        labels: {
          formatter: function() {
            return this.value + ' %';
          },
        },
      },
      series: [
        {
          color: '#f5f5f5',
          borderColor: 'transparent',
          type: 'bar',
          dataLabels: [
            {
              enabled: false,
            },
          ],
          name: 'Overall',
          data: getDataOverall(),
          tooltip: {
            valueDecimals: 2,
            headerFormat: '',
            useHTML: true,
            pointFormatter: function() {
              return `
                ${this.series.name}
              ${this.y.toFixed(2)}
              `;
            },
          },
        },
        ...levels.map((level, i) => {
          return {
            // colorByPoint: true,
            color: colors[i],
            showInLegend: () => {
              console.log(level, getDataLevels(level));
              return false;
            },

            marker: {
              // //   lineWidth: 0,
              fillColor: colors[i],
              //  lineColor: null,
              // //   radius: 7,
              // //   symbol: 'circle',
              // //   borderColor: 'transparent',
            },
            name: level,

            dataLabels: [
              {
                enabled: false,
              },
            ],
            data: getDataLevels(level),
            type: 'bubble',

            maxSize: 7,
            tooltip: {
              valueDecimals: 2,
              headerFormat: '',
              useHTML: true,
              pointFormatter: function() {
                return `
                  <span style="color:${this.color}"> ● </span> ${
                  this.series.name
                }: <b> ${this.y.toFixed(2)}
                  </b><br>
                  `;
              },
            },
          };
        }),
      ],
    });
  }, [data, colors, levels]);

  if (data === null) return null;
  return (
    <div style={{ width: 800 }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOption}
        callback={chart => (chartRef.current = chart)}
      />
    </div>
  );
}

export default RaceChart;
