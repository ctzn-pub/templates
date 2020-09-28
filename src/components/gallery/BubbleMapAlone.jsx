import React, { useEffect, useRef, useState } from 'react';
import data from './data/ridge.json';
import * as d3 from 'd3';
import { useStaticQuery, graphql } from 'gatsby';
import us from './data/counties-albers-10m.json';
import * as topojson from 'topojson-client';
import './bubbleStyle.css';

var formatNumber = d3.format(',.0f');

function BubbleMapAlone() {
  const svgRef = useRef();
  let width;
  let margin;
  let height;

  const querydata = useStaticQuery(graphql`
    query {
      hasura {
        electoral_history_yearly(where: { Year: { _eq: 2016 } }) {
          counties {
            color4
            id
            Per_Dem
            Per_Rep
            Total_Vote
          }
        }
      }
    }
  `);

  const finaldata = querydata.hasura.electoral_history_yearly[0].counties;
  useEffect(() => {
    const features = new Map(
      topojson.feature(us, us.objects.counties).features.map(d => [d.id, d])
    );

    const container = d3.select(svgRef.current);
    const w = container.node().clientWidth;
    margin = { top: 80, right: (w / 10) * 3 + 10, bottom: 50, left: w / 10 + 10 };

    height = 500 - margin.top - margin.bottom;
    // width = 800;
    width = w - margin.left - margin.right;
    var projection = d3
      .geoIdentity()
      .fitSize([width, height], topojson.feature(us, us.objects.counties));
    var path = d3.geoPath().projection(projection);

    let data = finaldata.map(a => {
      const feature = features.get(a.id);

      return {
        ...a,
        position: feature && path.centroid(feature),
        title: feature && feature.properties.name,
        meep: path.centroid(feature),
        value: +a.Total_Vote,
      };
    });
    var radius = d3.scaleSqrt([0, d3.max(data, d => d.value)], [0, 40]);

    console.log('container.node().clientWidth;', container.node().clientWidth);

    var svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');
    //read data

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
      .html(function(d) {
        return `
      <div>${d.title}</div>
      <div>Democrat: ${(100 * d.Per_Dem).toFixed(2)}%</div>
      <div>Republican: ${(100 * d.Per_Rep).toFixed(2)}%</div>
      <div>Total Votes: ${Number(d.Total_Vote).toLocaleString()}</div>
      `;
      });
  }, []);
  return (
    <div
      id="p"
      style={{
        width: '100%',
      }}
    >
      <svg ref={svgRef} width="900"></svg>
    </div>
  );
}

export default BubbleMapAlone;
