import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import us from './data/counties-albers-10m.json';
const format = d3.format(',.0f');
const spike = (length, width = 7) => `M${-width / 2},0L0,${-length}L${width / 2},0`;

const path = d3.geoPath();
const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));
const width = 750;
const height = 500;

function SpikeMap({ data: rawData, year }) {
  const [data, setData] = useState();

  var projection = d3
    .geoIdentity()
    .fitSize([width, height], topojson.feature(us, us.objects.counties));

  var path = d3.geoPath().projection(projection);

  useEffect(() => {
    if (rawData) {
      let data = rawData.map(a => {
        const feature = features.get(a.id);
        return {
          ...a,
          position: feature && path.centroid(feature),
          title: feature && feature.properties.name,
          value: +a.Total_Vote,
        };
      });

      setData(data);
    }
  }, [rawData, year]);

  const svgRef = useRef();
  useEffect(() => {
    if (!data) return;
    const length = d3.scaleSqrt([0, d3.max(data, d => d.value)], [0, 40]);

    const svg = d3.select(svgRef.current);

    const g = svg.append('g');

    g.append('path')
      .datum(topojson.feature(us, us.objects.nation))
      .attr('fill', '#fff')
      .attr('stroke', 'black')
      .attr('d', path);

    g.append('path')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-linejoin', 'round')
      .attr('d', path);

    g.append('g')

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
      .attr('fill', d => d.color4)
      .attr('fill-opacity', 0.3)
      .attr('stroke', d => d.color4)
      .append('title')
      .html(function(d) {
        return `
        <div>${d.title}</div>
        <div>Democrat: ${(100 * d.Per_Dem).toFixed(2)}%</div>
        <div>Republican: ${(100 * d.Per_Rep).toFixed(2)}%</div>
        <div>Total Votes: ${Number(d.Total_Vote).toLocaleString()}</div>

        `;
      });
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
}

export default SpikeMap;
