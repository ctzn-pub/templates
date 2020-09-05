import React, { useEffect, useRef, useState } from 'react';
import us from './data/counties-albers-10m.json';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bubbleStyle.css';
import { usePopulation } from '../../hooks/usePopulation';

var width = 750,
  height = 500;

const features = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]));

function DiscreteMap({ data: rawData }) {
  const [data, setData] = useState();
  const population = usePopulation();
  var projection = d3
    .geoIdentity()
    .fitSize([width, height], topojson.feature(us, us.objects.counties));

  var path = d3.geoPath().projection(projection);
  const svgRef = useRef();
  useEffect(() => {
    if (rawData) {
      let data = population.map(({ Population, id }) => {
        const feature = features.get(id);
        return {
          id,
          position: feature && path(feature),
          title: feature && feature.properties.name,
          value: +Population,
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

    const g = svg.append('g');

    g.append('path')
      .datum(topojson.feature(us, us.objects.nation))
      .attr('class', 'land')
      .attr('stroke', 'black')

      .attr('fill', '#fff')
      .attr('d', path);
    g.append('path')
      .datum(
        topojson.mesh(us, us.objects.counties, function(a, b) {
          return a !== b;
        })
      )
      .attr('stroke', 'black')

      .attr('fill', '#fff')
      .attr('d', path);

    g.append('g')
      .attr('class', 'countries')
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

    g.append('g')
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
      .attr('troke-width', '2px')
      .append('title')
      .html(function(d) {
        return `
        <div>${d.title}</div>
        <div>Democrat: ${(100 * d.Per_Dem).toFixed(2)}%</div>
        <div>Republican: ${(100 * d.Per_Rep).toFixed(2)}%</div>
        `;
      });
  }, [data]);
  return (
    <div className="bubble_container">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
}

export default DiscreteMap;
