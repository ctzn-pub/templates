import React, { useState, useEffect, useRef } from 'react';
import world from './data/110m-countires.geo.json';
import dataRaw from './data/countryData.json';

import * as d3 from 'd3';
import './d3MapsStyle.css';

const accessor = {
  id: d => d.iso3,
  country: d => d.country,
  rdi: d => +d.rdi,
  hdi: d => +d.hdi,
  continent: d => d.continent,
  income: d => d.income,
};
const data = dataRaw.map(d => Object.assign({}, d));
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
const dispatch = d3.dispatch('enter', 'leave', 'move', 'resize');

const options = {
  x: {
    rdi: {
      key: 'rdi',
      display: 'Religious Diversity Index (RDI)',
      shortDisplay: 'RDI',
    },
  },
  y: {
    hdi: {
      key: 'hdi',
      display: 'Human Development Index (HDI)',
      shortDisplay: 'HDI',
    },
  },
  color: {
    continent: {
      key: 'continent',
      display: 'Continent',
      domain: getCategoricalDomain('continent'),
    },
  },
  facet: {
    income: {
      key: 'income',
      display: 'Income Groupe',
      domain: ['Low income', 'Lower middle income', 'Upper middle income', 'High income'],
    },
  },
};

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

// Init
const selected = {
  x: 'rdi',
  y: 'hdi',
  color: 'continent',
  facet: 'income',
};

color.domain(options.color[selected.color].domain);
function FacetedScatterChart() {
  const chartRef = useRef();
  useEffect(() => {
    const container = d3.select(chartRef.current);
    renderBase(container);
    renderTitle(container.select('.chart-title'));
    renderColorLegend(container.select('.color-legend-container'));
    renderScatter(container.select('.scatter-chart-main'));
    renderTooltip(container.select('.chart-tooltip'), container);

    window.addEventListener('resize', resize);
    resize();
    function resize() {
      dispatch.call('resize');
    }
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
                  <div class="color-legend-container"></div>
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
  const facet = options.facet[selected.facet].display;
  container.text(`${y} vs ${x} (by ${facet})`);
}

// Legend
function renderColorLegend(container) {
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

// Scatter
function renderScatter(container) {
  const dimension = {
    totalWidth: null,
    totalHeight: 300,
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
  const dimension2 = {
    totalWidth: null,
    totalHeight: 324,
    margin: {
      top: 36,
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
  const r = 4;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, accessor[selected.x]))
    .nice();
  const y = d3
    .scaleLinear()
    .range([dimension.height, 0])
    .domain(d3.extent(data, accessor[selected.y]))
    .nice();
  const xFacet = d3.scaleBand().domain(options.facet[selected.facet].domain);
  const x2 = d3.local();
  const y2 = y.copy().range([dimension2.height, 0]);

  const svg = container.append('svg');
  const g = svg
    .append('g')
    .attr('transform', `translate(${dimension.margin.left},${dimension.margin.top})`)
    .datum({
      data,
      lr: linearRegression(data.map(d => [accessor[selected.x](d), accessor[selected.y](d)])),
    });
  const gXAxis = g.append('g').attr('class', 'x axis');
  const gYAxis = g.append('g').attr('class', 'y axis');
  const gCircles = g.append('g').attr('class', 'circles');
  const gTrend = g.append('g').attr('class', 'trend');

  const svg2 = container.append('svg');
  const g2 = svg2
    .append('g')
    .attr('transform', `translate(${dimension2.margin.left},${dimension2.margin.top})`)
    .selectAll('.facet-g')
    .data(
      xFacet.domain().map(facet => {
        const filtered = data.filter(d => accessor[selected.facet](d) === facet);
        return {
          facet,
          data: filtered,
          lr: linearRegression(
            filtered.map(d => [accessor[selected.x](d), accessor[selected.y](d)])
          ),
        };
      })
    )
    .join('g')
    .attr('class', 'facet-g')
    .each(function(d) {
      x2.set(
        this,
        x
          .copy()
          .domain(d3.extent(d.data, accessor[selected.x]))
          .nice()
      );
    });
  const g2Title = g2.append('g').attr('class', 'facet-titles');
  const g2XAxis = g2.append('g').attr('class', 'x axis');
  const g2YAxis = g2.append('g').attr('class', 'y axis');
  const g2Circles = g2.append('g').attr('class', 'circles');
  const g2Trend = g2.append('g').attr('class', 'trend');

  dispatch
    .on('resize.scatter', resize)
    .on('enter.scatter', highlight)
    .on('leave.scatter', resetHighlight);

  function render() {
    gXAxis.call(xAxis);
    gYAxis.call(yAxis);
    gTrend.call(trendLineAndAnnotation);
    gCircles.call(circles);

    g2.attr('transform', d => `translate(${xFacet(d.facet)},0)`);
    g2Title.call(facetTitle);
    g2XAxis.call(x2Axis);
    g2YAxis.call(y2Axis);
    g2Trend.call(trendLineAndAnnotation);
    g2Circles.call(circles);
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

  function x2Axis(g) {
    g.each(function(d, i, n) {
      const x2L = x2.get(this);
      const g = d3.select(this);
      g.attr('transform', `translate(0,${dimension2.height})`)
        .call(
          d3
            .axisBottom(x2L)
            .ticks(xFacet.bandwidth() / 50)
            .tickPadding(6)
            .tickSizeOuter(0)
            .tickSizeInner(-dimension2.height)
        )
        .call(g =>
          g
            .selectAll('.axis-title')
            .data([options.x[selected.x].shortDisplay])
            .join('text')
            .attr('class', 'axis-title')
            .attr('fill', 'currentColor')
            .attr('x', xFacet.bandwidth() / 2)
            .attr('y', dimension2.margin.bottom)
            .attr('dy', '-0.4em')
            .text(d => d)
        );
      if (i !== n.length - 1) {
        d3.select(this)
          .selectAll('.tick')
          .filter(tickValue => tickValue === x2L.domain()[1])
          .remove();
      }
    });
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

  function y2Axis(g) {
    g.call(
      d3
        .axisLeft(y2)
        .ticks(dimension2.height / 50)
        .tickPadding(6)
        .tickSizeOuter(0)
        .tickSizeInner(-xFacet.bandwidth())
    ).each(function(d, i) {
      if (i === 0) {
        d3.select(this)
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
          .text(d => d);
      } else {
        d3.select(this)
          .selectAll('.tick text')
          .remove();
      }
    });
  }

  function facetTitle(g) {
    g.selectAll('.facet-title')
      .data(d => [d.facet])
      .join(enter =>
        enter
          .append('text')
          .attr('class', 'facet-title')
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'middle')
          .attr('y', -6)
          .text(d => d)
      )
      .attr('x', xFacet.bandwidth() / 2);
  }

  function trendLineAndAnnotation(g) {
    g.each(function(d) {
      const xL = d.facet ? x2.get(this) : x;
      const yL = d.facet ? y2 : y;
      const lr = d.lr;
      d3.select(this)
        .call(g =>
          g
            .selectAll('.trend-line')
            .data([lr])
            .join(enter =>
              enter
                .append('line')
                .attr('class', 'trend-line')
                .attr('stroke', 'currentColor')
            )
            .attr('x1', d => xL.range()[0])
            .attr('y1', d => yL(d.slope * xL.domain()[0] + d.intercept))
            .attr('x2', d => xL.range()[1])
            .attr('y2', d => yL(d.slope * xL.domain()[1] + d.intercept))
        )
        .call(g =>
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
            .attr('x', xL.range()[1] - 6)
            .attr('y', 16)
            .attr('dy', (d, i) => `${i * 1.2 + 0.32}em`)
            .html(d => `${d.display} = ${d3.format('.3f')(lr[d.key])}`)
        );
    });
  }

  function circles(g) {
    g.each(function(d) {
      const xL = d.facet ? x2.get(this) : x;
      const yL = d.facet ? y2 : y;
      d3.select(this)
        .selectAll('.circle')
        .data(d => d.data, accessor.name)
        .join(enter =>
          enter
            .append('circle')
            .attr('class', 'circle marker')
            .attr('r', r)
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
        .attr(
          'transform',
          d => `translate(${xL(accessor[selected.x](d))},${yL(accessor[selected.y](d))})`
        );
    });
  }

  function resize() {
    dimension.totalWidth = container.node().clientWidth;
    dimension2.totalWidth = container.node().clientWidth;
    x.range([0, dimension.width]);
    xFacet.range([0, dimension2.width]);
    g2.each(function() {
      x2.get(this).range([0, xFacet.bandwidth()]);
    });

    svg.attr('viewBox', [0, 0, dimension.totalWidth, dimension.totalHeight]);
    svg2.attr('viewBox', [0, 0, dimension2.totalWidth, dimension2.totalHeight]);

    render();
  }

  function highlight(d) {
    container.selectAll('.circle').each(function(e) {
      if (e === d) {
        d3.select(this).classed('active', true);
      } else {
        d3.select(this).classed('inactive', true);
      }
    });
  }

  function resetHighlight() {
    container.selectAll('.circle').classed('active inactive', false);
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
export default FacetedScatterChart;
