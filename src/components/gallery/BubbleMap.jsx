import React, { useEffect, useRef, useState } from 'react';
import us from './data/counties-albers-10m.json';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './bubbleStyle.css';

var width = 960,
  height = 600;

var formatNumber = d3.format(',.0f');

var path = d3.geoPath();
const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));

//   .exponent(1.5);
// var radius = d3.scalePow([0, d3.max(data, d => d.value)], [0, 70]).exponent(6);

function BubbleMap({ data: rawData }) {
  const [data, setData] = useState();
  useEffect(() => {
    if (rawData) {
      let data = rawData.map(({ id, color4, Per_Dem, Per_Rep }) => {
        const feature = features.get(id);
        return {
          id,
          position: feature && path.centroid(feature),
          title: feature && feature.properties.name,
          color: color4,
          value: Math.abs(Per_Dem - Per_Rep) * 100,
        };
      });
      setData(data);
    }
  }, [rawData]);

  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    var radius = d3.scalePow([0, 100], [0, 50]).exponent(4);

    const svg = d3.select(svgRef.current);
    var legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(' + (width - 50) + ',' + (height - 20) + ')')
      .selectAll('g')
      .data(
        radius
          .ticks(4)
          .slice(1)
          .reverse()
      )
      .enter()
      .append('g');

    legend
      .append('circle')
      .attr('cy', function(d) {
        return -radius(d);
      })
      .attr('r', radius);

    legend
      .append('text')
      .attr('y', function(d) {
        return -2 * radius(d);
      })
      .attr('dy', '1.3em')
      .text(d3.format('.1s'));

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
      .attr('fill', d => d.color)
      .attr('fill-opacity', 0.3)
      .attr('stroke', d => d.color)
      .append('title')
      .text(function(d) {
        return d.title + 'color ' + d.color;
      });
  }, [data]);
  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
}

export default BubbleMap;
