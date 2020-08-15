import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import population from './data/population.json';

import us from './data/counties-albers-10m.json';
const format = d3.format(',.0f');
const spike = (length, width = 7) => `M${-width / 2},0L0,${-length}L${width / 2},0`;

const path = d3.geoPath();
const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));
console.log('population', population);
const data = population.slice(1).map(([population, state, county]) => {
  const id = state + county;
  const feature = features.get(id);
  return {
    id,
    position: feature && path.centroid(feature),
    title: feature && feature.properties.name,
    value: +population,
  };
});

const length = d3.scaleLinear([0, d3.max(data, d => d.value)], [0, 200]);

function SpikeMap() {
  const svgRef = useRef();
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg
      .append('path')
      .datum(topojson.feature(us, us.objects.nation))
      .attr('fill', '#e0e0e0')
      .attr('d', path);

    svg
      .append('path')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-linejoin', 'round')
      .attr('d', path);

    const legend = svg
      .append('g')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('g')
      .data(
        length
          .ticks(4)
          .slice(1)
          .reverse()
      )
      .join('g')
      .attr('transform', (d, i) => `translate(${975 - (i + 1) * 18},590)`);

    legend
      .append('path')
      .attr('fill', 'red')
      .attr('fill-opacity', 0.3)
      .attr('stroke', 'red')
      .attr('d', d => spike(length(d)));

    legend
      .append('text')
      .attr('dy', '1.3em')
      .text(length.tickFormat(4, 's'));

    svg
      .append('g')
      .attr('fill', 'red')
      .attr('fill-opacity', 0.3)
      .attr('stroke', 'red')
      .selectAll('path')
      .data(
        data
          .filter(d => d.position)
          .sort(
            (a, b) =>
              d3.ascending(a.position[1], b.position[1]) ||
              d3.ascending(a.position[0], b.position[0])
          )
      )
      .join('path')
      .attr('transform', d => `translate(${d.position})`)
      .attr('d', d => spike(length(d.value)))
      .append('title')
      .text(
        d => `${d.title}
            ${format(d.value)}`
      );
    // return svg.node();
  }, []);

  return (
    <div>
      <svg ref={svgRef} width="975" height="610" />
    </div>
  );
}

export default SpikeMap;
