import React, { useEffect, useRef, useState } from 'react';

import mapData from '../data/us/us-all.geo.json';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import drilldow from 'highcharts/modules/drilldown';
import mapFactory from 'highcharts/modules/map';

import dataModule from 'highcharts/modules/data';

if (typeof Highcharts === 'object') {
  mapFactory(Highcharts);
  drilldow(Highcharts);
  dataModule(Highcharts);
  Highcharts.maps['countries/us/us-all'] = mapData;
}

function DiscreteMap({ counties, states, year }) {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const dataUSALL = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
    const separators = Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline');
    // Set drilldown pointers
    dataUSALL.forEach(function(el, i) {
      el.drilldown = el.properties['hc-key'];
      const d = states.find(d => d.FIPS === +el.properties['state-fips']);
      el.color = d?.color;
    });

    const options = {
      chart: {
        width: 750,
        height: 500,
        events: {
          drilldown: async function(e) {
            if (!e.seriesOptions) {
              const chart = this;
              const mapKey = 'countries/us/' + e.point.drilldown + '-all';
              // Show the spinner
              chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

              // Load the drilldown map
              const res = await fetch(
                'https://code.highcharts.com/mapdata/' + mapKey + '.geo.json'
              );
              const dataMap = await res.json();

              Highcharts.maps[mapKey] = dataMap;

              let data = Highcharts.geojson(Highcharts.maps[mapKey]);

              chart.hideLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

              data.forEach(function(el, i) {
                el.drilldown = el.properties['hc-key'];
                //   el.color = 'red';
                const d = counties.find(d => d.id === el.properties.fips);
                el.color = d?.color4;
              });
              chart.addSeriesAsDrilldown(e.point, {
                name: e.point.name,
                data: data,
                dataLabels: {
                  enabled: true,
                  format: '{point.name}',
                },
              });
            }

            this.setTitle(null, { text: e.point.name });
          },
          drillup: function() {
            this.setTitle(null, { text: '' });
          },
        },
      },

      legend: {
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      //   colorAxis: {
      //     min: 0,
      //     minColor: '#E6E7E8',
      //     maxColor: '#005645',
      //   },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },

      plotOptions: {
        map: {
          states: {
            hover: {
              color: '#EEDD66',
            },
          },
        },
      },

      series: [
        {
          data: dataUSALL,
          name: 'USA',
          dataLabels: {
            enabled: true,
            format: '{point.properties.postal-code}',
          },
        },
        {
          type: 'mapline',
          data: separators,
          color: 'silver',
          enableMouseTracking: false,
          animation: {
            duration: 500,
          },
        },
      ],

      drilldown: {
        activeDataLabelStyle: {
          color: '#FFFFFF',
          textDecoration: 'none',
          textOutline: '1px #000000',
        },
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            x: 0,
            y: 60,
          },
        },
      },
    };

    setOptions(options);
  }, [states, counties]);

  if (!options) return null;
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType={'mapChart'} />
    </div>
  );
}

export default DiscreteMap;
