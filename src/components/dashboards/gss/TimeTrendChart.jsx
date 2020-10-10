import React, { useState, useEffect } from "react"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import HC_exporting from "highcharts/modules/exporting"
import { isMobile } from "react-device-detect"
if (typeof window !== `undefined`) {
  HC_exporting(Highcharts)
}

function Chart({ series, cut, title, x_label, y_label, shortname, isBinary }) {
  const [data, setData] = useState()
  const options = {
    chart: {
      height: "550px",
      style: {
        fontFamily: "Cardo",
      },
      backgroundColor: "transparent",
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
    title: {
      text: shortname,

      //+ "<i> by " + cut + "</i>",
      //margin: 2,
      style: {
        fontWeight: "bold",
      },
    },
    yAxis: {
      // visible: false,
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      tickColor: "#737373",
      tickWidth: 1,
      gridLineColor: "transparent",
      title: {
        style: {
          fontFamily: "Georgia",
        },
      },

      title: {
        enable: false,
        text: "% " + y_label,
        // offset: 20,
        style: {
          fontWeight: "bold",
          fontSize: "12px",
        },
      },

      type: "linear",
      min: 0,

      labels: {
        enabled: !isMobile,
        formatter: function() {
          return isBinary ? Math.round(this.value * 100) + "%" : this.value
        },
      },
    },
    credits: {
      enabled: true,

      text: "Data Source: General Social Survey",
      href: "/source/gss",
      style: {
        fontSize: "10px",
        color: "black",
        fontFamily: "Times",
      },
    },
    exporting: {
      enabled: false,
    },
    plotOptions: {
      series: {
        label: {
          enabled: false,
        },
        turboThreshold: 0,
        showInLegend: true,
      },
      treemap: {
        layoutAlgorithm: "squarified",
      },
      scatter: {
        marker: {
          symbol: "circle",
        },
      },
      line: {
        dataLabels: {
          enabled: true,
          formatter: function() {
            return isBinary ? Math.round(this.y * 100) + "%" : this.y
          },
        },
        marker: {
          fillColor: "#FFFFFF",
          lineWidth: 2,
          lineColor: null, // inherit from series
          symbol: "circle",
          radius: 3,
        },
        zIndex: 1,
      },
    },
    series: series,
    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      tickColor: "#737373",
      title: {
        style: {
          fontFamily: "Georgia",
        },
      },
      labels: {
        style: {
          fontFamily: "Georgia",
        },
      },
      type: "linear",
      title: {
        text: "Year",
      },
      plotBands: [
        {
          from: 1972,
          to: 1977,
          //    color: "#fffafe",
          color: "#ffe6e6",

          label: {
            text: "Nixon/Ford",
            align: "left",
            x: 10,
            y: -5,
            rotation: -90,
            verticalAlign: "bottom",
          },
        },
        {
          from: 1977,
          to: 1980,
          color: "#c5d8ff",
          // color: "#f7f8ff",
          label: {
            text: "Carter",
            align: "left",
            x: 10,
            y: -5,
            rotation: -90,
            verticalAlign: "bottom",
          },
        },
        {
          from: 1980,
          to: 1992,
          //     color: "#fffafe",
          color: "#ffe6e6",

          label: {
            text: "Reagan/Bush1",
            align: "left",
            x: 10,
            y: -5,
            rotation: -90,
            verticalAlign: "bottom",
          },
        },
        {
          from: 1992,
          to: 2000,
          //  color: "#f7f8ff",
          color: "#c5d8ff",

          label: {
            text: "Clinton",
            align: "left",
            x: 10,
            y: -5,
            rotation: -90,
            verticalAlign: "bottom",
          },
        },
        {
          from: 2000,
          to: 2008,
          //     color: "#fffafe",
          color: "#ffe6e6",

          label: {
            text: "Bush2",
            align: "left",
            x: 10,
            y: -5,
            rotation: -90,
            verticalAlign: "bottom",
          },
        },
        {
          from: 2008,
          to: 2016,
          color: "#c5d8ff",

          // color: "#f7f8ff",
          label: {
            text: "Obama",
            align: "left",
            x: 10,
            y: -5,
            rotation: -90,
            verticalAlign: "bottom",
          },
        },
        {
          from: 2016,
          to: 2018,
          //  color: "#fffafe",
          color: "#ffe6e6",
          label: {
            text: "Trump",
            align: "left",
            x: 10,
            y: -5,
            rotation: -90,
            verticalAlign: "bottom",
          },
        },
      ],
    },
    subtitle: {
      text: "Demographic Split: " + cut + " ",
      margin: 14,
      align: "center",
      style: {
        fontFamily: "Georgia",
        fontSize: "14px",
        useHTML: true,
      },
    },
    tooltip: {
      crosshairs: {
        enabled: true,
        color: "rgba(43,144,143,0.15)",
      },
      backgroundColor: "#f0f0f0",
      valueDecimals: 2,
      pointFormatter: function() {
        return `<span style="color:${this.color}"> ● </span> ${
          this.series.name
        }: <b> ${isBinary ? Math.round(this.y * 100) + "%" : this.y}
        </b><br>
        `
      },
      shared: true,
      borderWidth: 1,
      headerFormat:
        y_label +
        ' in <b>{point.x}</b><br>by <span style="color: #2b908f;font-weight:bold">' +
        cut +
        "</span><br>",
    },
    legend: {
      enabled: true,
      y: 22,
      x: 220,
      //  borderWidth: 1,

      layout: "horizontal",
      //  align: "right",
      itemStyle: {
        fontSize: "14px",
        fontWeight: "normal",
        fontFamily: "Georgia",
      },
      itemMarginTop: 3,
      itemMarginBottom: 0,
      verticalAlign: "top",
      floating: true,
      style: {
        fontSize: "1em",
      },
      //paddingTop: 5,
      // marginTop: 10,

      margin: 0,
      padding: 0,
    },
  }

  useEffect(() => {
    const newChartData = {
      series: series,
    }
    setData(newChartData)
  }, [series, title, x_label, y_label])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { width: "100%" } }}
    />
  )
}

export default Chart
