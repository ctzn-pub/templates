import React, { useEffect, useRef, useState } from 'react';
import us from './data/counties-albers-10m.json';
import population from './data/population.json';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import './bubbleStyle.css';

var formatNumber = d3.format(',.0f');

const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));

function BubbleMap({ data: rawData, year }) {
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
  }, [rawData, year]);
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    var radius = d3.scaleSqrt([0, d3.max(data, d => d.value)], [0, 40]);
    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();
    svg
      .append('path')
      .datum(topojson.feature(us, us.objects.nation))
      .attr('fill', '#fff')
      .attr('stroke', 'black')
      .attr('d', path);

    svg
      .append('path')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-linejoin', 'round')
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
        return d.title + 'color4 ' + d.id;
      });
  }, [data, year]);
  return (
    <div className="w-100 bubble_container" key={year}>
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
