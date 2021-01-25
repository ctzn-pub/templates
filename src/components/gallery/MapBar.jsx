import React, { useState, useEffect, useRef } from 'react';
import world from './data/110m-countires.geo.json';
import dataRaw from './data/countryData.json';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './d3MapsStyle.css';
const dispatch = d3.dispatch('enter', 'leave', 'move', 'resize');
const hdiQuintColors = ['#363636', '#9E9E9E', '#CFCFCF', '#CD96CD', '#7D26CD'];
const color = d3
  .scaleOrdinal()
  .domain(d3.range(1, hdiQuintColors.length + 1))
  .range(hdiQuintColors);
// Process data
const accessor = {
  id: d => d.iso3,
  country: d => d.country,
  hdi: d => +d.hdi,
  hdiQuint: d => +d.HDI_quint,
  hdiRank: d => +d.hdi_rank,
  feature: d => d.feature,
};

function resize() {
  dispatch.call('resize');
}
// Base
function renderBase(container) {
  container.html(`
        <div class="map-bar-chart chart">
          <div class="chart-title">Human Development Index (HDI)</div>
          <div class="map-chart"></div>
          <div class="bar-chart"></div>        
          <div class="chart-tooltip"></div>        
        </div>
      `);
}
function renderMap(container, data) {
  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const dimension = {
    totalWidth: null,
    margin: {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
    },
    get width() {
      return this.totalWidth - this.margin.left - this.margin.right;
    },
    get height() {
      return this.width * 0.47;
    },
    get totalHeight() {
      return this.height + this.margin.top + this.margin.bottom;
    },
  };

  const svg = container.append('svg');
  const g = svg
    .append('g')
    .attr('transform', `translate(${dimension.margin.left},${dimension.margin.top})`);

  dispatch
    .on('resize.map', resize)
    .on('enter.map', highlight)
    .on('leave.map', resetHighlight);

  function render() {
    g.selectAll('.country-path')
      .data(
        data.filter(d => !!accessor.feature(d)),
        accessor.id
      )
      .join(enter =>
        enter
          .append('path')
          .attr('class', 'country-path marker')
          .attr('fill', d => color(accessor.hdiQuint(d)))
          .on('mouseenter', function(event, d) {
            dispatch.call('enter', null, d);
          })
          .on('mousemove', function(event, d) {
            dispatch.call('move', event, d);
          })
          .on('mouseleave', function(event, d) {
            dispatch.call('leave', null, d);
          })
      )
      .attr('d', d => path(accessor.feature(d)));
  }

  function resize() {
    dimension.totalWidth = container.node().clientWidth;
    projection.rotate([-11, 0]).fitWidth(dimension.width, world);

    svg.attr('viewBox', [0, 0, dimension.totalWidth, dimension.totalHeight]);

    render();
  }

  function highlight(d) {
    g.selectAll('.country-path').each(function(e) {
      if (e === d) {
        d3.select(this)
          .raise()
          .classed('active', true);
      } else {
        d3.select(this).classed('inactive', true);
      }
    });
  }

  function resetHighlight() {
    g.selectAll('.country-path').classed('active inactive', false);
  }
}

// Bar
function renderBar(container, data) {
  const dimension = {
    totalWidth: null,
    totalHeight: 80,
    margin: {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
    },
    get width() {
      return this.totalWidth - this.margin.left - this.margin.right;
    },
    get height() {
      return this.totalHeight - this.margin.top - this.margin.bottom;
    },
  };

  const x = d3.scaleBand().domain(data.map(accessor.id));
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, accessor.hdi)])
    .range([dimension.height, 0]);

  const svg = container.append('svg');
  const g = svg
    .append('g')
    .attr('transform', `translate(${dimension.margin.left},${dimension.margin.top})`);

  dispatch
    .on('resize.bar', resize)
    .on('enter.bar', highlight)
    .on('leave.bar', resetHighlight);

  function render() {
    g.selectAll('.bar-rect')
      .data(data, accessor.id)
      .join(enter =>
        enter
          .append('rect')
          .attr('class', 'bar-rect marker')
          .attr('fill', d => color(accessor.hdiQuint(d)))
          .attr('y', d => y(accessor.hdi(d)))
          .attr('height', d => dimension.height - y(accessor.hdi(d)))
          .on('mouseenter', function(event, d) {
            dispatch.call('enter', null, d);
          })
          .on('mousemove', function(event, d) {
            dispatch.call('move', event, d);
          })
          .on('mouseleave', function(event, d) {
            dispatch.call('leave', null, d);
          })
      )
      .attr('x', d => x(accessor.id(d)))
      .attr('width', x.bandwidth());
  }

  function resize() {
    dimension.totalWidth = container.node().clientWidth;
    x.range([0, dimension.width]);

    svg.attr('viewBox', [0, 0, dimension.totalWidth, dimension.totalHeight]);

    render();
  }

  function highlight(d) {
    g.selectAll('.bar-rect').each(function(e) {
      if (e === d) {
        d3.select(this).classed('active', true);
      } else {
        d3.select(this).classed('inactive', true);
      }
    });
  }

  function resetHighlight() {
    g.selectAll('.bar-rect').classed('active inactive', false);
  }
}

// Tooltip
function renderTooltip(tooltip, container, data) {
  let tooltipBBox, containerBBox;

  function show(content, borderColor) {
    tooltip
      .html(content)
      .style('border-color', borderColor)
      .classed('show', true);
    tooltipBBox = tooltip.node().getBoundingClientRect();
    containerBBox = container.node().getBoundingClientRect();
  }

  function hide() {
    tooltip.classed('show', false);
  }

  function move() {
    let [x, y] = d3.pointer(this, container.node());
    x -= tooltipBBox.width / 2;
    if (x < 0) {
      x = 0;
    } else if (x > containerBBox.width - tooltipBBox.width) {
      x = containerBBox.width - tooltipBBox.width;
    }
    y -= tooltipBBox.height + 4;
    if (y < 0) {
      y = 0;
    }
    tooltip.style('transform', `translate(${x}px,${y}px)`);
  }

  dispatch
    .on('enter.tooltip', d => {
      const content = `
    <table>
      <tbody>
        <tr>
          <td>Country: </td>
          <td>${accessor.country(d)}</td>
        </tr>
        <tr>
          <td>HDI: </td>
          <td>${accessor.hdi(d)}</td>
        </tr>
        <tr>
          <td>Rank: </td>
          <td>${accessor.hdiRank(d)}/${data.length}</td>
        </tr>
      </tbody>
    </table>
  `;
      show(content, color(accessor.hdiQuint(d)));
    })
    .on('leave.tooltip', hide)
    .on('move.tooltip', move);
}
function MapBar() {
  const chartRef = useRef();

  useEffect(() => {
    const el = chartRef.current;

    const features = new Map(world.features.map(d => [d.properties.iso_a3, d]));
    const data = dataRaw
      .map(d => Object.assign({ feature: features.get(accessor.id(d)) }, d))
      .sort((a, b) => d3.descending(accessor.hdiRank(a), accessor.hdiRank(b)));
    // Global

    // Init
    const container = d3.select(el);
    renderBase(container);
    renderMap(container.select('.map-chart'), data);
    renderBar(container.select('.bar-chart'), data);
    renderTooltip(container.select('.chart-tooltip'), container, data);

    window.addEventListener('resize', resize);
    resize();

    // Map
  }, []);
  return (
    <div
      style={{
        maxWidth: '800px',
      }}
    >
      <div
        style={{
          width: '100%',
        }}
      >
        <div ref={chartRef}></div>
      </div>{' '}
    </div>
  );
}

export default MapBar;
