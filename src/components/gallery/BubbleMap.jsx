import React, { useEffect, useRef, useState } from 'react';
import us from './data/counties-albers-10m.json';
import population from './data/population.json';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './bubbleStyle.css';

var formatNumber = d3.format(',.0f');

const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));

//   .exponent(1.5);
// var radius = d3.scalePow([0, d3.max(data, d => d.value)], [0, 70]).exponent(6);

function BubbleMap({ data: rawData }) {
  const [data, setData] = useState();
  const [width, setWidth] = useState(750);
  const [height, setHeight] = useState(500);

  var projection = d3
    .geoIdentity()
    .fitSize([width, height], topojson.feature(us, us.objects.counties));

  var path = d3.geoPath().projection(projection);
  useEffect(() => {
    if (rawData) {
      let data = population.slice(1).map(([population, state, county]) => {
        const id = state + county;
        const feature = features.get(id);
        return {
          id,
          position: feature && path.centroid(feature),
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

  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    var radius = d3.scalePow([0, d3.max(data, d => d.value)], [0, 100]).exponent(1);
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
      .attr('width', width)

      .attr('d', path);

    svg
      .append('path')
      .datum(
        topojson.mesh(us, us.objects.counties, function(a, b) {
          return a !== b;
        })
      )
      .attr('class', 'border border--state')
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', width)
      .attr('d', path);

    svg
      .append('g')
      .attr('class', 'bubble')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('transform', function(d) {
        return 'translate(' + d.position + ')';
      })
      .attr('r', function(d) {
        return radius(d.value);
      })
      .attr('fill', d => d.color4)
      .attr('fill-opacity', 0.3)
      .attr('stroke', d => d.color4)
      .append('title')
      .text(function(d) {
        return d.title + 'color4 ' + d.color4;
      });
  }, [data]);
  return (
    <div className="w-100 bubble_container">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      ></svg>
    </div>
  );
}

export default BubbleMap;
