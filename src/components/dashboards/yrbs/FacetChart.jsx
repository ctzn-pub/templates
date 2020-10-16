import React, { useState, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';



function FacetChart({facet,ftitle, axis, max} ) {

    const gradeOrder = [{grade: "9th", order: 1},{grade: "10th", order: 2},{grade: "11th", order: 3},{grade: "12th", order: 4}]
    const c1 = facet.map(level => ({
        y: level.avg * 100,
        label: level.sex,
        name: level.grade,
        count: level.count,
        order: gradeOrder.filter(d=> d.grade == level.grade)[0].order
      }));
      const colors = ['#8700f8', '#00c4aa'];

      const pol_group = c1.reduce((acc, item) => {
        if (!acc[item.label]) {
          acc[item.label] = [];
        }
        acc[item.label].push(item);
        acc[item.label].sort((a, b) => a.order - b.order);
        return acc;
      }, []);
    
      const series = Object.keys(pol_group);
      const ser = series.reduce((seriesArr, label, i) => {
        return [
          ...seriesArr,
          {
            id: label,
            name: label,
            type: 'line',
            color: colors[i],
            data: pol_group[label],
          },
          
        ];
      }, []);

      const options = {
        subtitle: {
          style: {
            fontFamily: 'Georgia',
          },
        },
        legend: {
            enabled :false,
          itemStyle: { fontSize: 10 },

          title: {
            style: { fontSize: 12 },
            text: '',
            margin: 5
          },
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          margin: 0,
          padding: 0,
          itemMarginTop: 0,
          itemMarginBottom: 10,
        },
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)',
        chart: {
            margin: [undefined, 0, undefined,   ftitle == 'White'  ?  undefined : 10],
          style: {
            fontFamily: 'Georgia',
          },
          backgroundColor: 'transparent',
        },
        colors: ['#000'],
        title: {
          style: {
            fontFamily: 'Georgia',
            fontSize: 12,
          },
          text: ftitle,
          align: 'center',
        },
        yAxis: {
            lineColor: '#000000',
            lineWidth: 1,
            max: max,
        max: max,
         min: 0,
          gridLineColor: '#e7e7e7',
       //   lineColor: '#e7e7e7',
          minorGridLineColor: '#e7e7e7',
          tickColor: '#e7e7e7',
          tickWidth: 1,
          title: {
              text: ftitle == 'White'  ?  '% ' + axis : ''     ,
            style: {
              fontFamily: 'Georgia',
              fontSize: 10,
            },
          },
          type: 'linear',
          labels: {
            style: {
              fontFamily: 'Georgia',
              fontSize: ftitle == 'White'  ?   8 : 0,
            },
            //    format: "%",
          },
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        plotOptions: {
            line: {
                dataLabels: {
                  enabled: true,
                  formatter: function() {
                    var dataMax = this.series.dataMax;
                    var dataMin = this.series.dataMin;

                    if (this.y === dataMax || this.y === dataMin) {
  
                        const val = this.y;
                        return val.toFixed(2) + '%';
 
                    }
                  },
                }
            },
          series: {
            marker: {
              symbol: 'circle',
            },
            label: {
              enabled: false,
            },
          },
          scatter: {
            marker: {
              symbol: 'circle',
            },
          },
        },
        series: ser,
        xAxis: {  
          gridLineWidth: 1,
          gridLineColor: '#e7e7e7',
      lineColor: '#e7e7e7',
          minorGridLineColor: '#e7e7e7',
          tickColor: '#e7e7e7',
          tickWidth: 1,
          labels: {
            style: {
              fontFamily: 'Georgia',
              fontSize: 10,
            },
          },
    
          type: 'category',
        },
    
        tooltip: {
          crosshairs: {
            enabled: true,
            color: 'rgba(43,144,143,0.15)',
          },
    
          valueDecimals: 0,
    
          style: { fontSize: 10 },
          backgroundColor: '#fff',
          borderColor: '#8085e8',
    
          headerFormat: '<b>{point.key} grade ' + ftitle ,
          //  props.axis +
          //   "</b> <br><b>" +
          //    +
          //   " " +
          //  '</b> <span style="color: #2b908f;font-weight:bold">{point.key}</span>',
          pointFormat: `  {point.label}</b><br><span style='font-size:20px'> {point.y}% </span>${axis} <br> {point.count} Observations`,
        },
      };
  return (

 
  
          <HighchartsReact
        highcharts={Highcharts}
        containerProps={{ style: { height: '100%' } }}
        options={options}
      />
 

  );
}

 

export default FacetChart;
