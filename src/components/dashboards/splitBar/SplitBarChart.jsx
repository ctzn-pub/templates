import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

function RaceChart({ levels, data, colors, title, demo, overall }) {
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
      .sort((a, b) => b[1] - a[1]);

    return output;
  };
  React.useEffect(() => {
    setChartOption({
      credits: {
        enabled: false,

        text: 'Data Source: General Social Survey',
        // href: "/source/gss",
        style: {
          fontSize: '10px',
          color: 'black',
          fontFamily: 'Times',
        },
      },

      chart: {
        // hide levels with no data
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
          pointPadding: 0.1,
          groupPadding: 0,
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
        margin: 2,
        text: title + ' by ' + demo,
      },

      legend: {
        itemStyle: { fontSize: 10 },

        title: {
          style: { fontSize: 12 },
          text: null,
          //  (isBinary ? "% " : "") +
          //   this.props.rank.demographics_metum.sitewide_demographic,
        },
        layout: 'horizontal',
        // borderColor: "#F6F5F5",
        // borderWidth: 1,
        // borderColor: "#e0e0e0",
        align: 'center',
        verticalAlign: 'top',
        margin: 0,
        padding: 0,
        itemMarginTop: 0,
        itemMarginBottom: 10,
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
          color: '#e7e7e7',
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
            type: 'scatter',
            marker: {
              lineWidth: 0,
              fillColor: colors[i],
              lineColor: null,
              radius: 7,
              symbol: 'circle',
              borderColor: 'transparent',
            },
            name: level,
            dataLabels: [
              {
                enabled: false,
              },
            ],
            data: getDataLevels(level),
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
