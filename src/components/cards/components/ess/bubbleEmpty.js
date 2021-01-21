import React from "react"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import more from "highcharts/highcharts-more"

// init the module
if (typeof window !== `undefined`) {
  more(Highcharts)
}

function Bubble({
  data,
  type,
  dataset,
  axislabel,
  showLegend = false,
  chartsRefs = [],
  chartRef,
}) {
  const meta = data.gallerygraphs_country_meta_defs
  function filter_dates(event) {
    return event.short_name == type
  }
  var filtered = meta.filter(filter_dates)
  const source = filtered[0].Source
  const display = filtered[0].display_name
  let databub = data.overall.map(bub => ({
    y: bub.y,
    cntry: bub.country_metadatum.cntry,
    //  color: bub.country_metadatum.religionByReligion.color,
    religion: bub.country_metadatum.religion,
    z: bub.country_metadatum.z,
    x: bub.country_metadatum[type],
  }))

  const group = databub.reduce((acc, item) => {
    if (!acc[item.religion]) {
      acc[item.religion] = []
    }

    acc[item.religion].push(item)
    return acc
  }, {})

  let legdata
  if (dataset == "evs") {
    legdata = [
      {
        id: "Roman Catholic",
        name: "Roman Catholic",
        color: "#000",
        data: group["Roman Catholic"],
        type: "bubble",
        maxSize: 20,
      },
      {
        id: "Protestant",
        name: "Protestant",
        color: "#f1c410",
        data: group["Protestant"],
        type: "bubble",
        maxSize: 20,
      },

      {
        id: "Orthodox",
        name: "Orthodox",
        color: "#f00",
        data: group["Orthodox"],
        type: "bubble",
        maxSize: 20,
      },
      {
        id: "Muslim",
        name: "Muslim",
        color: "#080",
        data: group["Muslim"],
        type: "bubble",
        maxSize: 20,
      },
    ]
  } else {
    legdata = [
      {
        id: "Roman Catholic",
        name: "Roman Catholic",
        color: "#000",
        data: group["Roman Catholic"],
        type: "bubble",
        maxSize: 20,
      },
      {
        id: "Protestant",
        name: "Protestant",
        color: "#f1c410",
        data: group["Protestant"],
        type: "bubble",
        maxSize: 20,
      },

      {
        id: "Orthodox",
        name: "Orthodox",
        color: "#f00",
        data: group["Orthodox"],
        type: "bubble",
        maxSize: 20,
      },
      {
        id: "Muslim",
        name: "Muslim",
        color: "#080",
        data: group["Muslim"],
        type: "bubble",
        maxSize: 20,
      },
      {
        id: "Jewish",
        name: "Jewish",
        color: "#00f",
        data: group.Jewish,
        type: "bubble",
        maxSize: 20,
      },
    ]
  }
  const bubbleOptions = {
    plotOptions: {
      series: {
        events: showLegend
          ? {
              legendItemClick: function(event) {
                chartsRefs.forEach(chartRef => {
                  const chart = chartRef.current.chart
                  const series = chart.get(this.options.id) //get corresponding series

                  if (series) {
                    if (this.visible) {
                      series.hide()
                    } else {
                      series.show()
                    }
                  }
                })
              },
            }
          : {},
        states: {
          inactive: {
            opacity: 1,
          },
        },
      },
    },
    title: {
      text: null,
      style: {
        fontSize: "12px",
        fontFamily: "Georgia",
      },
    },
    yAxis: {
      visible: false,
      title: { text: null },
      lineWidth: 0,
      minorGridLineWidth: 0,
      tickColor: "#fff",
      gridLineWidth: 0,
    },
    xAxis: {
      visible: false,
      title: { text: null },
      lineWidth: 0,
      minorGridLineWidth: 0,
      tickColor: "#fff",
      gridLineWidth: 0,
    },
    credits: { enabled: false },
    exporting: { enabled: false },

    legend: {
      margin: 100,
      bubbleLegend: {
        enabled: true,
        labels: {
          format: "{value:.1f} Population (million)",
        },
        ranges: [
          { color: "transparent" },
          { color: "transparent" },
          {
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "#000"],
                [1, "transparent"],
              ],
            },
          },
        ],
      },
      enabled: showLegend,
      verticalAlign: "top",
      layout: "horizontal",
    },
    chart: {
      backgroundColor: "transparent",
      style: {
        fontFamily: "Georgia",
      },
      reflow: false,
    },
   
    series: legdata,
  }

  return (
    <div
      className="chart-container"
      style={{
        position: "relative",
        height: "95px",
        marginTop: "10px",
        overflow: "hidden",
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{
          style: { width: "100%", height: "300px", position: "absolute" },
        }}
        ref={chartRef}
        options={bubbleOptions}
        allowChartUpdate={false}
      />
    </div>
  )
}

export default Bubble
