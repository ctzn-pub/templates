import React, { useState } from "react"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import classnames from "classnames"
import Megaphone from "./../../../images/Megaphone.svg"
import HC_exporting from "highcharts/modules/exporting"
import more from "highcharts/highcharts-more"
import Info from "./../../../images/Infobutton.svg"

// init the module
if (typeof window !== `undefined`) {
  HC_exporting(Highcharts)
  more(Highcharts)
} 

function Effects(props) {
  const data2 = [...props.data].sort(
    (a, b) => a.demographic.order - b.demographic.order
  )
  let data = data2.map(level => ({
    high: level.confhigh,
    low: level.conflow,
    y: level.predicted,
    label: level.demographic.labels,
    name: level.demographic.labels,
  }))

  const thevalues = data.map(mo => mo.y)
  var max = thevalues.reduce(function(a, b) {
    return Math.max(a, b)
  })

  var min = thevalues.reduce(function(a, b) {
    return Math.min(a, b)
  })

  let difference = max - min
  difference = Math.round(difference * 100) / 100
  const maxlabel = data.filter(item => item.y === max)[0].label
  const minlabel = data.filter(item => item.y === min)[0].label

  const options = {
    subtitle: {
      style: {
        fontFamily: "Georgia",
      },
    },
    legendBackgroundColor: "rgba(0, 0, 0, 0.5)",
    background2: "#505053",
    dataLabelsColor: "#B0B0B3",
    textColor: "#C0C0C0",
    contrastTextColor: "#F0F0F3",
    maskColor: "rgba(255,255,255,0.3)",
    chart: {
      style: {
        fontFamily: "Georgia",
      },
      backgroundColor: "transparent",
    },
    colors: ["#000"],
    title: {
      style: {
        fontFamily: "Georgia",
        fontSize: 12,
      },
      text: "<h4>\n  " + props.title + "\n  <br/>\n</h4>",
      align: "center",
    },
    yAxis: {
      gridLineColor: "#e7e7e7",
      lineColor: "#e7e7e7",
      minorGridLineColor: "#e7e7e7",
      tickColor: "#e7e7e7",
      tickWidth: 1,
      title: {
        text: "Predicted " + props.axis,
        style: {
          fontFamily: "Georgia",
          fontSize: 10,
        },
      },
      type: "linear",
      labels: {
        style: {
          fontFamily: "Georgia",
          fontSize: 8,
        },
        format: `{value}${props.isBinary ? "%" : ""}`,
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
        label: {
          enabled: false,
        },
        turboThreshold: 0,
        showInLegend: false,
      },
      treemap: {
        layoutAlgorithm: "squarified",
      },
      scatter: {
        marker: {
          symbol: "circle",
        },
      },
    },
    series: [
      {
        group: "group",
        data: data,
        type: "line",
      },
      {
        group: "group",
        data: data,
        type: "errorbar",
        enableMouseTracking: false,
        showInLegend: false,
      },
    ],
    xAxis: {
      gridLineWidth: 1,
      gridLineColor: "#e7e7e7",
      lineColor: "#e7e7e7",
      minorGridLineColor: "#e7e7e7",
      tickColor: "#e7e7e7",
      tickWidth: 1,
      labels: {
        style: {
          fontFamily: "Georgia",
          fontSize: 10,
        },
      },
      title: {
        text: "",
      },

      type: "category",
    },
    legend: {
      enabled: false,
    },

    tooltip: {
      crosshairs: {
        enabled: true,
        color: "rgba(43,144,143,0.15)",
      },

      valueDecimals: 0,
      shared: true,
      style: { fontSize: 10 },
      backgroundColor: "#fff",
      borderColor: "#8085e8",
      //     borderWidth: 12,
      headerFormat: "Predicted " + props.axis + "<br>{point.key}",
      //  props.axis +
      //   "</b> <br><b>" +
      //    +
      //   " " +
      //  '</b> <span style="color: #2b908f;font-weight:bold">{point.key}</span>',
      pointFormat: `: {point.y:.1f}${props.isBinary ? "%" : ""}`,
    },
  }

  let information = props.suminfo
  // information =
  //   information.length > 0
  //     ? `${props.title} is one of the ${
  //         information[0].rank
  //       }important predictors of response to the question  ${
  //         props.shortname
  //       } in ${props.source} ${(<h2>'No'</h2>)} data.`
  //     : ""

  return (
 
      <div
        className=""
        style={{
          height: "300px",
        }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          containerProps={{ style: { height: "100%" } }}
          options={options}
        />
      </div>
   )
}

export default Effects
