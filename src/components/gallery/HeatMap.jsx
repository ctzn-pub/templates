import React from 'react';
import './heatmap.css';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
function geoHeatMap() {
  var stateData, dataByBrand, brandNames, brandSelected, allAverages, brandData;

  var xScale, yScale, colorScale, heatmapInner, heatmapOuter, heatMapWidth, heatMapHeight;

  var statePaths, geoPath, geoInner, geoOuter;

  var timeParse = d3.timeParse('%-m/%-e/%Y');
  var timeFormat = d3.timeFormat('%Y-%m');

  var states = [
    ['Maine', 'ME', 1, 23],
    ['Vermont', 'VT', 2, 50],
    ['New Hampshire', 'NH', 3, 33],
    ['Rhode Island', 'RI', 4, 44],
    ['Massachusetts', 'MA', 5, 25],
    ['Connecticut', 'CT', 6, 9],
    ['Delaware', 'DE', 7, 10],
    ['New Jersey', 'NJ', 8, 34],
    ['New York', 'NY', 9, 36],
    ['Pennsylvania', 'PA', 10, 42],
    // ["District of Columbia","DC",11,11],statePolygons
    ['Maryland', 'MD', 12, 24],
    ['Virginia', 'VA', 13, 51],
    ['North Carolina', 'NC', 14, 37],
    ['South Carolina', 'SC', 15, 45],
    ['Georgia', 'GA', 16, 13],
    ['Alabama', 'AL', 17, 1],
    ['Mississippi', 'MS', 18, 28],
    ['Louisiana', 'LA', 19, 22],
    ['Arkansas', 'AR', 20, 5],
    ['Tennessee', 'TN', 21, 47],
    ['Kentucky', 'KY', 22, 21],
    ['West Virginia', 'WV', 23, 54],
    ['Oklahoma', 'OK', 24, 40],
    ['Colorado', 'CO', 25, 8],
    ['Utah', 'UT', 26, 49],
    ['Idaho', 'ID', 27, 16],
    ['Wyoming', 'WY', 28, 56],
    ['Montana', 'MT', 29, 30],
    ['North Dakota', 'ND', 30, 38],
    ['South Dakota', 'SD', 31, 46],
    ['Nebraska', 'NE', 32, 31],
    ['Kansas', 'KS', 33, 20],
    ['Iowa', 'IA', 34, 19],
    ['Minnesota', 'MN', 35, 27],
    ['Wisconsin', 'WI', 36, 55],
    ['Indiana', 'IN', 37, 18],
    ['Missouri', 'MO', 38, 29],
    ['Ohio', 'OH', 39, 39],
    ['Michigan', 'MI', 40, 26],
    ['Illinois', 'IL', 41, 17],
    ['Florida', 'FL', 42, 12],
    ['California', 'CA', 43, 6],
    ['Nevada', 'NV', 44, 32],
    ['Texas', 'TX', 45, 48],
    ['Arizona', 'AZ', 46, 4],
    ['New Mexico', 'NM', 47, 35],
    ['Alaska', 'AK', 48, 2],
    ['Washington', 'WA', 49, 53],
    ['Oregon', 'OR', 50, 41],
    ['Hawaii', 'HI', 51, 15],
  ];

  var stateCodes = states
    .sort(function(a, b) {
      return a[3] - b[3];
    })
    .map(function(d) {
      return d[1];
    });

  ///////////////////////////
  // Load and process data //
  ///////////////////////////
  Promise.all([d3.json('us-10m-unprojected.json'), d3.csv('sample.csv')]).then(([us, data]) =>
    processData(null, us, data)
  );

  function processData(error, us, data) {
    if (error) throw error;

    // Process geojson data
    statePaths = topojson.feature(us, us.objects.state);
    var statePathMap = d3.map(statePaths.features, function(d) {
      return d.id;
    });

    stateData = states
      .sort(function(a, b) {
        return a[3] - b[3];
      })
      .map(function(state) {
        return {
          stateName: state[0],
          stateCode: state[1],
          statePath: statePathMap.get(paddingZero(state[3])),
        };
      });

    // Process csv data
    data = data.map(typeConversion);
    function typeConversion(d) {
      d.date = timeFormat(timeParse(d.date));
      d.hits = +d.hits;
      return d;
    }

    // Group the data by brand name
    dataByBrand = d3
      .nest()
      .key(function(d) {
        return d.Brand;
      })
      .map(data);

    brandNames = dataByBrand.keys(); // All brand names in the csv
    brandSelected = brandNames[0]; // Initialize with the first brand

    renderStatic(); // Render brand non-specific elements
    render(brandSelected); // Render brand specific elements
  }

  ///////////////////////////////////////
  //// Render Static Elements ///////////
  ///////////////////////////////////////
  function renderStatic() {
    ///////////////////////////////////////
    //// Title ////////////////////////////
    ///////////////////////////////////////
    var heatMapBrandSelected = d3.select('.geo-heat-map-title');
    heatMapBrandSelected.text(brandSelected);
    ///////////////////////////////////////
    //// Brand Filter /////////////////////
    ///////////////////////////////////////
    var filtersContainer = d3.select('.brand-filter-container');

    var filters = filtersContainer
      .selectAll('p')
      .data(brandNames)
      .enter()
      .append('p')
      .attr('class', 'geo-heat-map-filter')
      .classed('geo-heat-map-filter-highlighted', function(d) {
        return d === brandSelected;
      });

    filters
      .append('span')
      .attr('class', 'geo-heat-map-filter-text')
      .text(function(d) {
        return d;
      })
      .on('click', function(d) {
        brandSelected = d;
        filters.classed('geo-heat-map-filter-highlighted', function(d) {
          return d === brandSelected;
        });
        heatMapBrandSelected.text(d);
        render(brandSelected);
      });

    filters
      .append('span')
      .attr('class', 'geo-heat-map-filter-dot')
      .text(function(d, i) {
        return i === filters.size() - 1 ? null : '•';
      });

    filtersContainer
      .append('p')
      .attr('class', 'geo-heat-map-filter-label')
      .text('Select a brand');

    ///////////////////////////////////////
    //// Legend ///////////////////////////
    ///////////////////////////////////////

    var heatmapLegend = d3.select('.geo-heat-map-legend-container');

    heatmapLegend
      .append('p')
      .attr('class', 'geo-heat-map-legend-text')
      .html("Search Index <span class='boldify'>0</span>");

    heatmapLegend
      .selectAll('div')
      .data(d3.schemeReds[8])
      .enter()
      .append('div')
      .attr('class', 'geo-heat-map-legend-box')
      .style('background-color', function(d) {
        return d;
      });

    heatmapLegend
      .append('p')
      .attr('class', 'geo-heat-map-legend-text')
      .html(" <span class='boldify'>100</span>");

    ///////////////////////////////////////
    //// Heatmap //////////////////////////
    ///////////////////////////////////////
    var heatMapContainer = d3.select('.heat-map-container');
    var heatMapMargin = { top: 20, right: 20, bottom: 50, left: 50 };
    heatMapWidth = 540 - heatMapMargin.left - heatMapMargin.right;
    heatMapHeight = 500 - heatMapMargin.top - heatMapMargin.bottom;

    ///////////////////////////////////////
    // Scales
    xScale = d3.scaleBand().range([0, heatMapWidth]);

    yScale = d3
      .scaleBand()
      .domain(stateCodes)
      .range([0, heatMapHeight]);

    colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, 100]);

    ///////////////////////////////////////
    // SVG container
    heatmapOuter = heatMapContainer
      .append('svg')
      .attr('width', heatMapWidth + heatMapMargin.left + heatMapMargin.right)
      .attr('height', heatMapHeight + heatMapMargin.top + heatMapMargin.bottom);

    heatmapInner = heatmapOuter
      .append('g')
      .attr('transform', 'translate(' + heatMapMargin.left + ',' + heatMapMargin.top + ')');

    ///////////////////////////////////////
    // Axes
    var yAxis = heatmapInner
      .append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft().scale(yScale));

    ///////////////////////////////////////
    //// Map //////////////////////////////
    ///////////////////////////////////////
    var geoContainer = d3.select('.geo-container');
    var geoMargin = { top: 0, right: 0, bottom: 0, left: 0 };
    var geoWidth = 540 - geoMargin.left - geoMargin.right;
    var geoHeight = 500 - geoMargin.top - geoMargin.bottom;

    var projection = d3.geoAlbersUsa().fitSize([geoWidth, geoHeight], statePaths);

    geoPath = d3.geoPath().projection(projection);
    ///////////////////////////////////////
    // SVG container
    geoOuter = geoContainer
      .append('svg')
      .attr('width', geoWidth + geoMargin.left + geoMargin.right)
      .attr('height', geoHeight + geoMargin.top + geoMargin.bottom);

    geoInner = geoOuter
      .append('g')
      .attr('transform', 'translate(' + geoMargin.left + ',' + geoMargin.top + ')');
  }

  ///////////////////////////////////////
  //// Render Brand Specific Elements ///
  ///////////////////////////////////////
  function render(brandSelected) {
    brandData = dataByBrand.get(brandSelected);

    ///////////////////////////////////////
    //// Heatmap //////////////////////////
    ///////////////////////////////////////

    var brandDataByMonth = d3
      .nest()
      .key(function(d) {
        return d.date;
      })
      .entries(brandData);

    var allDates = brandData
      .filter(function(d) {
        return d.State === 'AL';
      })
      .map(function(d) {
        return d.date;
      });

    xScale.domain(allDates);

    ///////////////////////////////////////
    // Axes
    var xAxisBottom = heatmapInner
      .append('g')
      .attr('class', 'x axis bottom')
      .attr('transform', 'translate(0,' + heatMapHeight + ')')
      .call(
        d3
          .axisBottom()
          .scale(xScale)
          .tickFormat(function(d, i) {
            return d.split('-')[0];
          })
      );
    xAxisBottom
      .selectAll('text')
      .attr('y', 0)
      .attr('x', -6)
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');
    xAxisBottom.selectAll('.tick').style('display', function(d, i) {
      return i % 12 === 0 ? null : 'none';
    });
    heatmapInner.selectAll('.domain').remove();

    ///////////////////////////////////////
    // Heatmap Grid
    var heatmapColumn = heatmapInner
      .append('g')
      .selectAll('g')
      .data(brandDataByMonth)
      .enter()
      .append('g')
      .attr('class', function(d) {
        return 'heat-map-column-' + d.key;
      })
      .attr('transform', function(d) {
        return 'translate(' + xScale(d.key) + ',0)';
      });

    heatmapColumn
      .append('g')
      .selectAll('rect')
      .data(function(d) {
        return d.values;
      })
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', function(d) {
        return yScale(d.State);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', function(d) {
        return colorScale(d.hits);
      });
    // Invisible rect to capture mouse event
    heatmapColumn
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', xScale.bandwidth())
      .attr('height', heatMapHeight)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', function(d) {
        var date = d.key;
        d3.select(this).style('stroke', '#000');

        updateMap([date]);
      })
      .on('mouseout', function(d) {
        d3.select(this).style('stroke', null);
        updateMap([]);
      });

    ///////////////////////////////////////
    //// Map //////////////////////////////
    ///////////////////////////////////////
    var brandAllTimeAverage = computeAverage(brandData);

    stateData.forEach(function(d) {
      d.allTimeAverage = brandAllTimeAverage.get(d.stateCode);
      d.average = d.allTimeAverage;
    });

    updateMap([]);
  }

  function updateMap(timePeriod) {
    if (timePeriod.length) {
      var timePeriodData = brandData.filter(function(d) {
        return timePeriod.includes(d.date);
      });

      var timePeriodAverage = computeAverage(timePeriodData);
      stateData.forEach(function(d) {
        d.average = timePeriodAverage.get(d.stateCode);
      });
    }

    let statePolygons = geoInner.selectAll('path').data(stateData, function(d) {
      return d.stateCode;
    });

    statePolygons
      .enter()
      .append('path')
      .attr('class', function(d) {
        return 'state-polygon-' + d.stateCode;
      })
      .attr('d', function(d) {
        return geoPath(d.statePath);
      })
      .style('stroke', '#fff')
      .style('stroke-width', 0.5)
      .merge(statePolygons)
      .style('fill', function(d) {
        return timePeriod.length ? colorScale(d.average) : colorScale(d.allTimeAverage);
      });
  }
}
function computeAverage(data) {
  return d3
    .nest()
    .key(function(d) {
      return d.State;
    })
    .rollup(function(leaves) {
      return (
        d3.sum(leaves, function(d) {
          return d.hits;
        }) / leaves.length
      );
    })
    .map(data);
}

function paddingZero(number) {
  var numberString = String(number);
  return numberString.length === 1 ? '0' + numberString : numberString;
}

function App() {
  geoHeatMap();
  return (
    <div className="App">
      <div class="container">
        <div class="geo-heat-header">
          <p class="geo-heat-map-title"></p>
          <div class="brand-filter-container"></div>
        </div>

        <div class="geo-heat-map-container">
          <div class="geo-heat-map-legend-container"></div>
          <div class="geo-heat-map-inner-container">
            <div class="heat-map-container"></div>
            <div class="geo-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
