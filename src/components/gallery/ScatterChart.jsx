import React, { useState, useEffect, useRef } from 'react';
import dataRaw from './data/countryData.json';

import * as d3 from 'd3';
import './d3MapsStyle.css';
const accessor = {
  id: d => d.iso3,
  country: d => d.country,
  rdi: d => +d.rdi,
  tcr: d => (d.tcr === '' ? null : +d.tcr),
  hdi: d => +d.hdi,
  gini: d => (d.gini === '' ? null : +d.gini),
  continent: d => d.continent,
  religion: d => d.religious_culture_cia_world_factbook || 'N/A',
  population: d => +d.total_population_millions,
};

const data = dataRaw
  .map(d => Object.assign({}, d))
  .sort((a, b) => d3.descending(accessor.population(a), accessor.population(b)));
// Init
const selected = {
  x: 'rdi',
  y: 'hdi',
  color: 'religion',
  r: 'population',
};

function getCategoricalDomain(variable) {
  let domain = [...new Set(data.map(accessor[variable]))].sort();
  const otherIndex = domain.indexOf('Other');
  if (otherIndex !== -1) {
    domain.splice(otherIndex, 1);
    domain.push('Other');
  }
  const naIndex = domain.indexOf('N/A');
  if (naIndex !== -1) {
    domain.splice(naIndex, 1);
    domain.push('N/A');
  }
  return domain;
}
// Global
const dispatch = d3.dispatch(
  'xchange',
  'ychange',
  'colorchange',
  'enter',
  'leave',
  'move',
  'resize'
);

const options = {
  x: {
    rdi: {
      key: 'rdi',
      display: 'Religious Diversity Index (RDI)',
      shortDisplay: 'RDI',
    },
    tcr: { key: 'tcr', display: 'TCR', shortDisplay: 'TCR' },
  },
  y: {
    hdi: {
      key: 'hdi',
      display: 'Human Development Index (HDI)',
      shortDisplay: 'HDI',
    },
    gini: { key: 'gini', display: 'GINI Index', shortDisplay: 'GINI' },
  },
  color: {
    religion: {
      key: 'religion',
      display: 'Religion',
      domain: getCategoricalDomain('religion'),
    },
    continent: {
      key: 'continent',
      display: 'Continent',
      domain: getCategoricalDomain('continent'),
    },
  },
  r: {
    population: {
      key: 'population',
      display: 'Population (in millions)',
    },
  },
};

const minRadius = 1;
const maxRadius = 24;
const r = d3
  .scaleSqrt()
  .domain([0, d3.max(data, accessor.population)])
  .range([minRadius, maxRadius]);

const colors = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
];
const color = d3.scaleOrdinal().range(colors);
dispatch.on('colorchange.domain', colorChange);
function colorChange() {
  color.domain(options.color[selected.color].domain);
}
function resize() {
  dispatch.call('resize');
}
function ScatterChart() {
  const chartRef = useRef();

  useEffect(() => {
    const container = d3.select(chartRef.current);
    renderBase(container);
    renderTitle(container.select('.chart-title'));
    renderSelect(container.select('.x-select-container'), 'x');
    renderSelect(container.select('.y-select-container'), 'y');
    renderSelect(container.select('.color-select-container'), 'color');
    renderColorLegend(container.select('.color-legend-container'));
    renderSizeLegend(container.select('.size-legend-container'));
    renderScatter(container.select('.scatter-chart-main'));

    renderTooltip(container.select('.chart-tooltip'), container);

    window.addEventListener('resize', resize);
    resize();
  }, []);

  return (
    <div
      style={{
        width: 900,
      }}
    >
      <div ref={chartRef}></div>
    </div>
  );
}

// Base
function renderBase(container) {
  container.html(`
      <div class="scatter-chart chart">
        <div class="chart-title"></div>
        <div class="with-sidebar">
          <div>
            <div class="not-sidebar">
              <div class="scatter-chart-main"></div>
            </div>
            <div class="sidebar stack">
              <div class="x-select-container"></div>
              <div class="y-select-container"></div>
              <div class="color-select-container"></div>
              <div class="color-legend-container"></div>
              <div class="size-legend-container"></div>
            </div>
          </div>
        </div>     
        <div class="chart-tooltip"></div>        
      </div>
    `);
}

// Title
function renderTitle(container) {
  const y = options.y[selected.y].display;
  const x = options.x[selected.x].display;
  container.text(`${y} vs ${x}`);
}

// Select
function renderSelect(container, type) {
  const id = `scatter-chart-${type}-select`;
  const label = `Select ${type[0].toUpperCase() + type.slice(1)} Variable`;

  container
    .append('label')
    .attr('for', id)
    .text(label);
  container
    .append('select')
    .attr('id', id)
    .on('change', change)
    .selectAll('option')
    .data([{ key: '', display: label }, ...Object.values(options[type])], d => d.key)
    .join('option')
    .attr('disabled', (d, i) => (i === 0 ? 'disabled' : null))
    .attr('selected', d => (d.key === selected[type] ? 'selected' : null))
    .attr('value', d => d.key)
    .text(d => d.display);

  function change() {
    selected[type] = this.value;
    dispatch.call(`${type}change`);
  }
}

// Legend
function renderColorLegend(container) {
  function render() {
    container
      .selectAll('.legend-title')
      .data([options.color[selected.color].display])
      .join(enter => enter.append('div').attr('class', 'legend-title'))
      .text(d => d);
    container
      .selectAll('.legend-items')
      .data([0])
      .join(enter => enter.append('div').attr('class', 'legend-items'))
      .selectAll('.legend-item')
      .data(color.domain())
      .join(enter =>
        enter
          .append('div')
          .attr('class', 'legend-item')
          .call(div => div.append('div').attr('class', 'legend-swatch'))
          .call(div => div.append('div').attr('class', 'legend-label'))
      )
      .call(div => div.select('.legend-swatch').style('background-color', d => color(d)))
      .call(div => div.select('.legend-label').text(d => d));
  }
  render();
  dispatch.on('colorchange.legend', render);
}

function renderSizeLegend(container) {
  container
    .append('div')
    .attr('class', 'legend-title')
    .text(options.r.population.display);

  const n = Math.round(Math.log10(r.domain()[1]));
  const ticks = d3.range(n + 1).map(i => Math.pow(10, i));
  const outerSize = Math.ceil(r(ticks[ticks.length - 1]) * 2);
  container
    .append('div')
    .attr('class', 'legend-items')
    .selectAll('.legend-item')
    .data(ticks)
    .join('div')
    .attr('class', 'legend-item')
    .call(div =>
      div
        .append('div')
        .attr('class', 'legend-size-outer')
        .style('width', `${outerSize}px`)
        .style('height', d => `${Math.max(r(d) * 2, 16)}px`)
        .call(div =>
          div
            .append('div')
            .attr('class', 'legend-size-inner')
            .style('width', d => `${r(d) * 2}px`)
            .style('height', d => `${r(d) * 2}px`)
        )
    )
    .call(div =>
      div
        .append('div')
        .attr('class', 'legend-label')
        .text(d => d)
    );
}

// Scatter
function renderScatter(container) {
  const dimension = {
    totalWidth: null,
    totalHeight: 500,
    margin: {
      top: 12,
      right: 16,
      bottom: 36,
      left: 56,
    },
    get width() {
      return this.totalWidth - this.margin.left - this.margin.right;
    },
    get height() {
      return this.totalHeight - this.margin.top - this.margin.bottom;
    },
  };

  const x = d3.scaleLinear();
  const y = d3.scaleLinear().range([dimension.height, 0]);

  let lr;

  const svg = container.append('svg');
  const g = svg
    .append('g')
    .attr('transform', `translate(${dimension.margin.left},${dimension.margin.top})`);
  const gXAxis = g.append('g').attr('class', 'x axis');
  const gYAxis = g.append('g').attr('class', 'y axis');
  const gCircles = g.append('g').attr('class', 'circles');
  const gTrend = g.append('g').attr('class', 'trend');

  dispatch
    .on('resize.scatter', resize)
    .on('enter.scatter', highlight)
    .on('leave.scatter', resetHighlight)
    .on('xchange.scatter', () => {
      xChange();
      updateLR();
      render();
    })
    .on('ychange.scatter', () => {
      yChange();
      updateLR();
      render();
    })
    .on('colorchange.scatter', render);

  xChange();
  yChange();
  updateLR();

  function xChange() {
    x.domain(d3.extent(data, accessor[selected.x])).nice();
  }

  function yChange() {
    y.domain(d3.extent(data, accessor[selected.y])).nice();
  }

  function updateLR() {
    const points = data.map(d => [accessor[selected.x](d), accessor[selected.y](d)]);
    lr = linearRegression(points);
  }

  function render() {
    gXAxis.call(xAxis);
    gYAxis.call(yAxis);
    gTrend.call(trendLineAndAnnotation);
    gCircles
      .selectAll('.circle')
      .data(data, accessor.name)
      .join(enter =>
        enter
          .append('circle')
          .attr('class', 'circle marker')
          .attr(
            'transform',
            d => `translate(${x(accessor[selected.x](d))},${y(accessor[selected.y](d))})`
          )
          .attr('r', d => r(accessor[selected.r](d)))
          .attr('fill', d => color(accessor[selected.color](d)))
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

      .transition()
      .attr(
        'transform',
        d => `translate(${x(accessor[selected.x](d))},${y(accessor[selected.y](d))})`
      )
      .attr('fill', d => color(accessor[selected.color](d)));
  }

  function xAxis(g) {
    g.attr('transform', `translate(0,${dimension.height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(dimension.width / 80)
          .tickPadding(6)
          .tickSizeOuter(0)
          .tickSizeInner(-dimension.height)
      )
      .call(g =>
        g
          .selectAll('.axis-title')
          .data([options.x[selected.x].display])
          .join('text')
          .attr('class', 'axis-title')
          .attr('fill', 'currentColor')
          .attr('x', dimension.width / 2)
          .attr('y', dimension.margin.bottom)
          .attr('dy', '-0.4em')
          .text(d => d)
      );
  }

  function yAxis(g) {
    g.call(
      d3
        .axisLeft(y)
        .ticks(dimension.height / 50)
        .tickPadding(6)
        .tickSizeOuter(0)
        .tickSizeInner(-dimension.width)
    ).call(g =>
      g
        .selectAll('.axis-title')
        .data([options.y[selected.y].display])
        .join('text')
        .attr('class', 'axis-title')
        .attr('text-anchor', 'middle')
        .attr('fill', 'currentColor')
        .attr('transform', `rotate(-90)`)
        .attr('x', -dimension.height / 2)
        .attr('y', -dimension.margin.left)
        .attr('dy', '1em')
        .text(d => d)
    );
  }

  function trendLineAndAnnotation(g) {
    g.call(g =>
      g
        .selectAll('.trend-line')
        .data([lr])
        .join(enter =>
          enter
            .append('line')
            .attr('class', 'trend-line')
            .attr('stroke', 'currentColor')
            .attr('x1', d => x.range()[0])
            .attr('y1', d => y(d.slope * x.domain()[0] + d.intercept))
            .attr('x2', d => x.range()[1])
            .attr('y2', d => y(d.slope * x.domain()[1] + d.intercept))
        )
        .transition()
        .attr('x1', d => x.range()[0])
        .attr('y1', d => y(d.slope * x.domain()[0] + d.intercept))
        .attr('x2', d => x.range()[1])
        .attr('y2', d => y(d.slope * x.domain()[1] + d.intercept))
    ).call(g =>
      g
        .selectAll('.trend-annotation')
        .data([
          { key: 'correlationCoefficient', display: 'CC' },
          {
            key: 'rSquared',
            display: "R<tspan baseline-shift='super' font-size='0.75em'>2</tspan>",
          },
        ])
        .join(enter =>
          enter
            .append('text')
            .attr('class', 'trend-annotation')
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'end')
        )
        .attr('x', dimension.width - 6)
        .attr('y', 16)
        .attr('dy', (d, i) => `${i * 1.2 + 0.32}em`)
        .html(d => `${d.display} = ${d3.format('.3f')(lr[d.key])}`)
    );
  }

  function resize() {
    dimension.totalWidth = container.node().clientWidth;
    x.range([0, dimension.width]);

    svg.attr('viewBox', [0, 0, dimension.totalWidth, dimension.totalHeight]);

    render();
  }

  function highlight(d) {
    gCircles.selectAll('.circle').each(function(e) {
      if (e === d) {
        d3.select(this).classed('active', true);
      } else {
        d3.select(this).classed('inactive', true);
      }
    });
  }

  function resetHighlight() {
    gCircles.selectAll('.circle').classed('active inactive', false);
  }
}

// Tooltip
function renderTooltip(tooltip, container) {
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
              <td>${options.x[selected.x].shortDisplay}: </td>
              <td>${accessor[selected.x](d)}</td>
            </tr>
            <tr>
              <td>${options.y[selected.y].shortDisplay}: </td>
              <td>${accessor[selected.y](d)}</td>
            </tr>
          </tbody>
        </table>
      `;
      show(content, color(accessor[selected.color](d)));
    })
    .on('leave.tooltip', hide)
    .on('move.tooltip', move);
}

// Linear regression
function linearRegression(points) {
  const lr = {},
    N = points.length;
  let sumX = 0,
    sumY = 0,
    sumXx = 0,
    sumYy = 0,
    sumXy = 0;

  if (N < 2) {
    return lr;
  }

  for (let i = 0; i < N; i++) {
    const x = points[i][0];
    const y = points[i][1];
    sumX += x;
    sumY += y;
    sumXx += x * x;
    sumYy += y * y;
    sumXy += x * y;
  }

  const numerator = N * sumXy - sumX * sumY;
  lr['slope'] = numerator / (N * sumXx - sumX * sumX);
  lr['intercept'] = (sumY - lr['slope'] * sumX) / N;
  lr['correlationCoefficient'] =
    numerator / Math.sqrt((N * sumXx - sumX * sumX) * (N * sumYy - sumY * sumY));
  lr['rSquared'] = lr['correlationCoefficient'] * lr['correlationCoefficient'];
  return lr;
}

export default ScatterChart;
