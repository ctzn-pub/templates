import React, { useEffect, useRef } from 'react';
import us from './data/counties-albers-10m.json';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './bubbleStyle.css';
import population from './data/population.json';
import fat from './data/obesity.json';
var width = 960,
  height = 600;

var formatNumber = d3.format(',.0f');

var path = d3.geoPath();
const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));

let data = population.slice(1).map(([population, state, county]) => {
  const id = state + county;
  const feature = features.get(id);
  return {
    id,
    position: feature && path(feature),
    title: feature && feature.properties.name,
    // value: +population,
  };
});

const mergeById = (a1, a2) =>
  a1.map(itm => ({
    ...a2.find(item => item.id === itm.id && item),
    ...itm,
  }));

data = mergeById(data, fat).filter(d => d.position);

var radius = d3.scalePow([0, d3.max(data, d => d.value)], [0, 15]).exponent(4);
//   .exponent(1.5);
// var radius = d3.scalePow([0, d3.max(data, d => d.value)], [0, 70]).exponent(6);

function DiscreteMap() {
  console.log([d3.min(data, d => d.value), d3.max(data, d => d.value)], [0, 1000]);
  //   console.log('data1', data);
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    // var legend = svg
    //   .append('g')
    //   .attr('class', 'legend')
    //   .attr('transform', 'translate(' + (width - 50) + ',' + (height - 20) + ')')
    //   .selectAll('g')
    //   .data(
    //     radius
    //       .ticks(4)
    //       .slice(1)
    //       .reverse()
    //   )
    //   .enter()
    //   .append('g');

    // legend
    //   .append('circle')
    //   .attr('cy', function(d) {
    //     return -radius(d);
    //   })
    //   .attr('r', radius);

    // legend
    //   .append('text')
    //   .attr('y', function(d) {
    //     return -2 * radius(d);
    //   })
    //   .attr('dy', '1.3em')
    //   .text(d3.format('.1s'));

    svg
      .append('path')
      .datum(topojson.feature(us, us.objects.nation))
      .attr('class', 'land')
      .attr('d', path);

    svg
      .append('path')
      .datum(
        topojson.mesh(us, us.objects.counties, function(a, b) {
          return a !== b;
        })
      )

      .attr('class', 'border border--state')
      .attr('d', path);

    svg
      .append('g')
      //   .attr("class", "countries")
      .selectAll('path')
      .data(
        data.sort(function(a, b) {
          return b.value - a.value;
        })
      )
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', function(d) {
        return d.color;
      })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style('opacity', 0.8)
      // tooltips
      .style('stroke', 'white')
      .style('stroke-width', 0.3);

    svg
      .append('g')
      .attr('class', 'bubble')
      .selectAll('path')
      .data(
        data.sort(function(a, b) {
          return b.value - a.value;
        })
      )
      .enter()
      .append('path')
      .attr('d', d => {
        return d.position;
      })
      .attr('fill', d => d.color)
      .attr('fill-opacity', 0.3)
      .attr('stroke', d => d.color)
      .append('title')
      .text(function(d) {
        return d.title + '\nPopulation ' + formatNumber(d.value);
      });
  }, []);
  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
}

export default DiscreteMap;
