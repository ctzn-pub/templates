import React, { useEffect, useRef } from 'react';
import data from './data/ridge.json';
import * as d3 from 'd3';

// set the dimensions and margins of the graph
var margin = { top: 80, right: 300, bottom: 50, left: 100 },
  width = 900 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page

// This is what I need to compute kernel density estimation
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [
        x,
        d3.mean(V, function(v) {
          return kernel(x - v);
        }),
      ];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
  };
}

function RidgeLine() {
  const svgRef = useRef();
  useEffect(() => {
    // Get the different categories and count them
    const categories = [...new Set(data.map(d => d.state))];
    const fillCat = [...new Set(data.map(d => d.state_round1_rec))];
    const title = 'Zipcode Differences in Weekend Spending';
    const subTitle = 'Recived Stimulus $ on April 10 (Yes or No)';
    const xLabel = '% Difference Weekend Spending';
    var svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    //read data

    var n = categories.length;
    // Compute the mean of each group
    let allMeans = [];
    for (let i in categories) {
      let currentGroup = categories[i];
      let groupData = data.filter(d => d.state === currentGroup);
      let mean = d3.mean(groupData, function(d) {
        return +d.pct_difference;
      });
      allMeans.push(mean);
    }
    // Create a color scale using these means.
    var myColor = d => (d.state_round1_rec === 'Did not recieve' ? 'black' : 'orange');

    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([-200, 200])
      .range([0, width]);
    svg
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        d3
          .axisBottom(x)
          .tickValues([-200, -100, 0, 100, 200])
          .tickSize(-height)
      )
      .select('.domain')
      .remove();

    // Add X axis label:
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height + 40)
      .text(xLabel);

    // title
    // Add title and explanation
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('x', width / 2)
      .attr('y', -55)
      //   .attr('width', 90)
      .html(title)
      .style('font-size', 16)
      .style('font-weight', 'bold');

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('x', width / 2)
      .attr('y', -35)
      //   .attr('width', 90)
      .html(subTitle)
      .style('font-size', 14)
      .style('font-weight', 'light');
    // fill legend

    const legendX = width + 50;
    const legendy = height / 2;
    svg
      .append('circle')
      .attr('cx', legendX)
      .attr('cy', legendy)
      .attr('r', 6)
      .style('fill', 'black');
    svg
      .append('circle')
      .attr('cx', legendX)
      .attr('cy', legendy + 30)
      .attr('r', 6)
      .style('fill', 'orange');
    svg
      .append('text')
      .attr('x', legendX + 10)
      .attr('y', legendy)
      .text('Did not recieve')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');
    svg
      .append('text')
      .attr('x', legendX + 10)
      .attr('y', legendy + 30)
      .text('Recieved stimulus')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');

    // Create a Y scale for densities
    var y = d3
      .scaleLinear()
      .domain([0, 0.15])
      .range([height, 0]);

    // Create the Y axis for names
    var yName = d3
      .scaleBand()
      .domain(categories)
      .range([0, height])
      .paddingInner(1);
    svg
      .append('g')
      .call(d3.axisLeft(yName).tickSize(0))
      .select('.domain')
      .remove();

    // Compute kernel density estimation for each column:
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)); // increase this 40 for more accurate density.
    var allDensity = [];
    for (let i = 0; i < n; i++) {
      let key = categories[i];
      let groupData = data.filter(d => d.state === key);
      console.log(new Set(groupData.map(d => d.state_round1_rec)));
      let density = kde(
        groupData.map(function(d) {
          return d.pct_difference;
        })
      );
      allDensity.push({
        key: key,
        density: density,
        state_round1_rec: groupData[0].state_round1_rec,
      });
    }
    // Add areas
    svg
      .selectAll('areas')
      .data(allDensity)
      .enter()
      .append('path')
      .attr('transform', function(d) {
        return 'translate(0,' + (yName(d.key) - height) + ')';
      })
      .attr('fill', function(d) {
        return myColor(d);
      })
      .datum(function(d) {
        return d.density;
      })
      .attr('opacity', 0.7)
      .attr('stroke', '#000')
      .attr('stroke-width', 0.1)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveBasis)
          .x(function(d) {
            return x(d[0]);
          })
          .y(function(d) {
            return y(d[1]);
          })
      );
  }, []);
  return (
    <div>
      <svg ref={svgRef} width={900} height="400" />
    </div>
  );
}

export default RidgeLine;
