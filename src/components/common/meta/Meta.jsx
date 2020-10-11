import React from 'react';
import { Bar } from "react-chartjs-2"
 

function Meta ({ metadata, summary_barchart}) {

    const ordredLevels = [...summary_barchart].sort((a, b) => a.order - b.order)
    const labels = ordredLevels.map(l => l.level)
    const serie = ordredLevels.map(l => l.level_count)
    let colors
 
    colors = ordredLevels.map(l =>
      l.color === 1 ? "black" : "rgb(183, 183, 183)"
    )
  
    var options = {
        defaultFontFamily: "Georgia",
        tooltips: {
          enabled: true,
          backgroundColor: "#fff",
          titleFontColor: "#000",
          borderWidth: 1,
          titleFontSize: 10,
          bodyFontSize: 10,
          titleFontFamily: "Georgia",
          bodyFontFamily: "Georgia",
          bodyFontColor: "#000",
          borderColor: "rgb(183, 183, 183)",
          displayColors: false,
          cornerRadius: 0,
    
          callbacks: {
            title: function(tooltipItem, data) {
              return  " Level: " + tooltipItem[0].label
            },
            label: function(tooltipItem, data) {
              return (
                "Total observations: " +
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              )
            },
          },
        },
        legend: {
          display: false,
        },
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                fontFamily: "Georgia",
                fontSize: 10,
    
                display: false,
                labelString: "Distribution",
              },
    
              gridLines: {
                display: false,
              },
              ticks: {
                //  display: width > 500 ? true : false,
                fontFamily: "Georgia",
                fontSize: 10 ,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                fontFamily: "Georgia",
                fontSize: 10,
    
                display: true,
                labelString: "# of observations",
              },
              ticks: {
                minor: {
                  display: true,
                },
                major: {
                  display: false,
                },
                fontFamily: "Georgia",
                fontSize: 10,
                maxTicksLimit: 4,
            //    display: width > 500 ? true : false,
                callback: function(value, index, array) {
                  return value / 1000 + "k"
                },
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        responsive: true,
        title: {
          display: true,
          fontSize: 12,
          fontStyle: "normal",
          fontFamily: "Geogria",
          fontColor: "#333b3f",
          text: "Response Distribution",
        },
      }

      
    const chartdata = {
        labels: labels,
        datasets: [
          {
            label: null,
            data: serie,
            barPercentage: 0.55,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      }


    return(
    
<div>
<div style={{ marginLeft: "auto", marginRight: "auto" }}>
              <h3> 🛠{"  "} Transformation </h3>
              <p
                style={{
                  fontSize: "14px",
                  borderTop: "1px solid #ccc",
                  marginTop: "10px"
                }}
              >
                Original variable ({metadata.scale_original}) transformed to
                a binary scale as  {metadata.transformation}
              </p>
              
            </div>
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
              <h3> Quesetion </h3>
              <p
                style={{
                  fontSize: "14px",
                  borderTop: "1px solid #ccc",
                  marginTop: "10px"
                }}
              >
              {metadata.question_text}
              </p>
              <div style={{'width': "400px"}}>
              <Bar data={chartdata} height={150} options={options} />
              </div>
            </div>
</div>

 

)}
export default Meta;
