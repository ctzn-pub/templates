import React from "react"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import more from "highcharts/highcharts-more"
import { FaCentercode } from "react-icons/fa"

// init the module
if (typeof window !== `undefined`) {
  more(Highcharts)
}

function Bubble({
  data,
  type,
  axislabel,
  showLegend = false,
  chartsRefs = [],
  chartRef,
}) {
  const meta = data.gallerygraphs_country_meta_defs
  const corr = data.corr
  function filter_corr(event) {
    return event.y == type
  }
  var corr_filt = corr.filter(filter_corr)
  const corrVal = corr_filt[0].r
  function filter_dates(event) {
    return event.short_name == type
  }
  const fits = data.fits

  function filter_fits(event) {
    return event.cat == type
  }

  var fitfilt = fits.filter(filter_fits)
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
      text: display,
      align: "center",
      style: {
        fontSize: "14px",
        fontFamily: "Georgia",
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 300,
          },
          chartOptions: {
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
    yAxis: {
      title: { text: axislabel },
      lineWidth: 0,
      minorGridLineWidth: 0,
      tickColor: "#737373",
      gridLineWidth: 0,
    },
    credits: {
      enabled: true,
      href: "",
      text: "Correlation: " + corrVal,
      style: {
        color: "#6940a5",
        cursor: "pointer",
        fontFamily: "Arial",
        fontSide: "8px",
      },
    },
    exporting: { enabled: false },

    legend: {
      enabled: showLegend,
      verticalAlign: "top",
      // title: { text: "Main Religion" },
      layout: "horizontal",

      // floating: true,
      // x: 100,
      // y: 100,
    },
    chart: {
      backgroundColor: "transparent",
      style: {
        fontFamily: "Georgia",
      },
      reflow: true,
    },
    series: [
      {
        group: "group",
        data: fitfilt,
        type: "arearange",
        enableMouseTracking: false,
        color: "#ecebeb",
        linkedTo: "fit",
      },
      {
        group: "group",
        data: fitfilt,
        type: "line",
        showInLegend: false,
        enableMouseTracking: false,
        color: "rgba(0,0,0,0.1)",
        name: "Fit",
        id: "fit",
      },
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
    ],
    xAxis: { lineWidth: 0, norGridLineWidth: 0, tickColor: "#737373" },
    tooltip: {
      crosshairs: { enabled: true, color: "#f7f2e6" },
      backgroundColor: "white",
      shared: true,
      useHTML: true,
      borderWidth: 1,
      headerFormat: "  ",
      pointFormat:
        "{point.cntry}<br> <b>" +
        display +
        ": </b> {point.x}  <br> <font color='#0da094'>" +
        axislabel +
        " </font>: {point.y:.2f} <br>Population: {point.z} Million<br>  Religion: <span style='color:{point.color}'>●</span> {point.religion}<br/>",
    },
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{
        style: { width: "100%", height: "100%" },
      }}
      ref={chartRef}
      options={bubbleOptions}
    />
  )
}

export default Bubble
