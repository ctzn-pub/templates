import React, { Component } from "react"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"

// import "../highcharts.css"

class DemoChart extends Component {
  render() {

    const { isBinary, axislabel, demos, overall} = this.props
console.log('demos', demos)
    
    let overalldata =overall.map(d => ({
      y: d.y,
      iso2: d.country_metadatum.iso2,
      name: d.country_metadatum.name,
    }))
    if(isBinary){
      
      overalldata =overall.map(d => ({
        y: d.y*100,
        iso2: d.country_metadatum.iso2,
        name: d.country_metadatum.name,
      }))
    }
    const chartOptions = {
      credits: { enabled: false },
      exporting: { enabled: false },
      legend: {
        itemStyle: { fontSize: 10 },

        title: {
          style: { fontSize: 12 },
          text: null,
          //  (isBinary ? "% " : "") +
          //   this.props.rank.demographics_metum.sitewide_demographic,
        },
        layout: "horizontal",
        // borderColor: "#F6F5F5",
        // borderWidth: 1,
        // borderColor: "#e0e0e0",
        align: "center",
        verticalAlign: "top",
        margin: 0,
        padding: 0,
        itemMarginTop: 0,
        itemMarginBottom: 10,
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
          },
          label: { enabled: false },
          turboThreshold: 0,
          showInLegend: true,
        },
      },

      chart: {
        height: "850px",
        backgroundColor: "transparent",
        style: {
          width: "100%",

          fontFamily: "Georgia",
        },
      },

      series: [
        {
          name: "Country Average",
          data: overalldata,
          type: "bar",
          color: "#e7e7e7",
          borderColor: "transparent",
          tooltip: {
            valueDecimals: 2,
            headerFormat: "",
            useHTML: true,
            pointFormatter: function() {
              return `
              <span><img width='16' src="https://www.countryflags.io/${
                this.iso2
              }/flat/16.png"> ${this.name}<br /> ● </span> ${
                this.series.name
              }: <b> ${isBinary ? this.y.toFixed(2) + "%" : this.y.toFixed(2)}
              </b><br>
              `
            },
          },
        },
        ...this.props.levels.map((level, i) => ({
          color: demos
            .filter(
              d =>
                d.demographics_metum.sitewide_demographic ===
                  this.props.rank.demographics_metum.sitewide_demographic &&
                d.level === level
            )
            .map(d => ({
              color: d.dlevel.color,
            }))[0].color,
          name: level,
          data: demos
            .filter(
              d =>
                d.demographics_metum.sitewide_demographic ===
                  this.props.rank.demographics_metum.sitewide_demographic &&
                d.level === level
            )
            .map(d => ({
            iso2: d.country_metadatum.iso2,
             y: isBinary  ? d.y*100:  d.y,
              name: d.country_metadatum.name,
            })),
          type: "scatter",
          marker: {
            lineWidth: 2,
            fillColor: "#f2f2f2",
            lineColor: null,
            // radius: 6,

            radius: 5,

            symbol: "circle",
          },
          //color: this.props.rank.demographics_metum["color" + (i + 1)],

          tooltip: {
            valueDecimals: 2,
            headerFormat: "",
            useHTML: true,
            pointFormatter: function() {
              return `
              <span style="color:${
                this.color
              }"><img width='16' src="https://www.countryflags.io/${
                this.iso2
              }/flat/16.png"> ${this.name}<br /> ● </span> ${
                this.series.name
              }: <b> ${isBinary ? this.y.toFixed(2) + "%" : this.y.toFixed(2)}
              </b><br>
              `
            },
          },
        })),
      ],

      title: {
        margin: 2,
        text:
          this.props.title +
          " by " +
          this.props.rank.demographics_metum.sitewide_demographic,
      },

      yAxis: {
        title: {
          text: isBinary ? axislabel : "Average " + this.props.title,
        },
        min: (() => {
          const min = Math.min(
            ...demos
              .filter(d => d.demographic === this.props.rank.demo)
              .map(d => d.y)
          )
          return Number.isFinite(min) ? min - 0.5 : 5
        })(),
        labels: {
          enabled: !isBinary,
        },
        startOnTick: false,
        tickInterval: 1,
        gridLineColor: "transparent",
      },
      xAxis: {
        gridLineColor: "transparent",
        lineWidth: 0,
        minorGridLineWidth: 0,
        tickWidth: 1,
        lineColor: "transparent",
        tickColor: "#737373",
        title: { text: " " },
        type: "category",
      },
      tooltip: {
        valueDecimals: 2,
        useHTML: true,
      },
    }

    return (
      <>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{
            width: "100%",
          }}
        />
      </>
    )
  }
}

export default DemoChart
