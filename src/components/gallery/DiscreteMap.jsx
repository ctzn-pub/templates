import React, { useEffect, useRef, useState } from 'react';
import us from './data/counties-albers-10m.json';
import population from './data/population.json';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './bubbleStyle.css';

var width = 960,
  height = 600;

var path = d3.geoPath();
const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));

// var radius = d3.scalePow([0, d3.max(data, d => d.value)], [0, 15]).exponent(4);
//   .exponent(1.5);
// var radius = d3.scalePow([0, d3.max(data, d => d.value)], [0, 70]).exponent(6);

function DiscreteMap({ data: rawData }) {
  const [data, setData] = useState();

  const svgRef = useRef();
  useEffect(() => {
    if (rawData) {
      // let data = rawData.map(({ id, color44 }) => {
      //   const feature = features.get(id);
      //   return {
      //     id,
      //     position: feature && path(feature),
      //     title: feature && feature.properties.name,
      //     color4: color44,
      //   };
      // });
      let data = population.slice(1).map(([population, state, county]) => {
        const id = state + county;
        const feature = features.get(id);
        return {
          id,
          position: feature && path(feature),
          title: feature && feature.properties.name,
          value: +population,
        };
      });

      const mergeById = (a1, a2) =>
        a1.map(itm => ({
          ...a2.find(item => item.id === itm.id && item),
          ...itm,
        }));

      data = mergeById(data, rawData).filter(d => d.position);
      setData(data);
    }
  }, [rawData]);
  useEffect(() => {
    if (!data) return;
    const svg = d3.select(svgRef.current);

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
      .data(data)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', function(d) {
        return d.color4;
      })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style('opacity', 1)
      // tooltips
      .style('stroke', 'white')
      .style('stroke-width', 0.3);

    svg
      .append('g')
      // .attr('class', 'bubble')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d => {
        return d.position;
      })
      .attr('fill', d => d.color4)
      .attr('fill-opacity', 0.5)
      .attr('stroke', d => d.color4)
      .append('title')
      .text(function(d) {
        return d.title + 'color4 ' + d.color4;
      });
  }, [data]);
  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
}

export default DiscreteMap;
