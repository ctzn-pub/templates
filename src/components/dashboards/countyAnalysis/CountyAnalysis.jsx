import React, { useState, useEffect, useRef } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import DiscreteMap from '../../gallery/highmaps/DiscreteMap';
import DiscreteMapCounty from '../../gallery/DiscreteMap';
import BubbleMap from '../../gallery/BubbleMap';
import SpikeMap from '../../gallery/SpikeMap';
import Skeleton from '@material-ui/lab/Skeleton';
import * as d3 from 'd3';
import CheckIcon from '@material-ui/icons/Check';

import { useYears } from '../../../hooks/useYears';
import { useCountyElectionData } from '../../../hooks/useCountyelectionData';
function CountyAnalysis() {
  const years = useYears();

  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const [activeTab, setActiveTab] = useState('Choropleth by County');
  const [loading, setLoading] = useState();
  const { data, loading: loadingQuery } = useCountyElectionData(selectedYear.Year);
  const loadingTimeOut = useRef();

  useEffect(() => {
    setLoading(true);
    loadingTimeOut.current = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(loadingTimeOut.current);
  }, [selectedYear.Year]);

  const imagesQueryData = useStaticQuery(query);
  const images = imagesQueryData.allFile.edges.map(y => y.node);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div
        className="border rounded dash_card "
        style={{
          width: 900,
        }}
      >
        <YearsSelect years={years} setSelectedYear={setSelectedYear} selectedYear={selectedYear} />
        <ElectionInfo images={images} selectedYear={selectedYear} />

        <div className=" dash_card_body border-bottom">
          <Nav tabs className=" mb-2">
            <NavItem>
              <NavLink
                tag="div"
                className={classnames('d-flex align-items-center h-100 w-100 ml-2 ', {
                  active: activeTab === 'Choropleth',
                })}
                onClick={() => {
                  toggle('Choropleth');
                }}
              >
                <div className="tabname">Choropleth</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag="div"
                className={classnames('d-flex align-items-center h-100 w-100 ml-2 ', {
                  active: activeTab === 'Choropleth by County',
                })}
                onClick={() => {
                  toggle('Choropleth by County');
                }}
              >
                <div className="tabname">Choropleth by County</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag="div"
                className={classnames('d-flex align-items-center h-100 w-100 ml-2 ', {
                  active: activeTab === 'Bubble',
                })}
                onClick={() => {
                  toggle('Bubble');
                }}
              >
                <div className="tabname">Bubble</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag="div"
                className={classnames('d-flex align-items-center h-100 w-100 ml-2 ', {
                  active: activeTab === 'Spiky',
                })}
                onClick={() => {
                  toggle('Spiky');
                }}
              >
                <div className="tabname">Spiky</div>
              </NavLink>
            </NavItem>
          </Nav>
          {!data || loading || loadingQuery ? (
            <>
              <h1 className="text-center">Loading</h1>
              <Skeleton variant="rect" width={900} height={500} />
            </>
          ) : (
            <div key={selectedYear.Year}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="Choropleth">
                  <DiscreteMap
                    counties={data.counties}
                    states={data.states}
                    year={selectedYear.Year}
                  />
                </TabPane>
              </TabContent>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="Choropleth by County">
                  <DiscreteMapCounty data={data.counties} year={selectedYear.Year} />
                </TabPane>
              </TabContent>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="Bubble">
                  <BubbleMap data={data.counties} year={selectedYear.Year} />
                </TabPane>
              </TabContent>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="Spiky">
                  <SpikeMap data={data.counties} year={selectedYear.Year} />
                </TabPane>
              </TabContent>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CountyAnalysis;

const YearsSelect = ({ years, setSelectedYear, selectedYear }) => {
  return (
    <div className="d-flex w-100 justify-content-around my-4 position-relative px-3">
      <div
        className="border-bottom position-absolute w-100 "
        style={{
          top: '15px',
        }}
      ></div>
      {years.map(y => (
        <div
          className={classnames('d-flex flex-column justify-content-center align-items-center')}
          onClick={() => setSelectedYear(y)}
          key={y.Year}
          style={{
            zIndex: '2',
            cursor: 'pointer',
          }}
        >
          <div
            className={classnames('rounded-circle', {
              'bg-danger': y.winning_party === 'R',
              'bg-primary': y.winning_party === 'D',
            })}
            style={{
              border: selectedYear.Year === y.Year ? '2px solid black' : null,
              width: 30,
              height: 30,
              // backgroundColor: y.winning_party === 'R' ? 'red' : 'blue',
            }}
          ></div>
          <div>{y.Year}</div>
        </div>
      ))}
    </div>
  );
};
const ElectionInfo = ({ images, selectedYear }) => {
  return (
    <Row className="d-flex justify-content-around">
      <div>
        <div className="lead text-center mb-3 text-bold">Electoral Votes</div>
      </div>
      <Col sm="12">
        <VotesBar
          data={[
            {
              label: selectedYear.D_Nominee_prop,
              value: selectedYear.D_EV_Total,
            },
            {
              label: selectedYear.R_Nominee_prop,
              value: selectedYear.R_EV_Total,
            },
          ]}
        />
      </Col>
      <Col>
        <NomineeBox
          name={selectedYear.D_Nominee_prop}
          party="D"
          image={images.find(i => selectedYear.dem_pic === i.name)?.publicURL}
        />
      </Col>
      <Col>
        <div className>
          <div className="d-flex justify-content-between w-100 display-4">
            <p className="text-primary w-50 text-left d-flex">
              <div className="w-25 mr-2">
                {selectedYear.winning_party === 'D' && (
                  <CheckIcon style={{ fontSize: 40, marginBottom: 10 }} />
                )}
              </div>
              <div className="w-75">{selectedYear.D_EV_Total}</div>
            </p>
            <p className="text-danger w-50 text-right d-flex">
              <div className="w-75">{selectedYear.R_EV_Total}</div>
              <div className="w-25 ml-2">
                {selectedYear.winning_party === 'R' && (
                  <CheckIcon style={{ fontSize: 40, marginBottom: 10 }} />
                )}
              </div>
            </p>
          </div>
          <div className="d-flex justify-content-around w-100 lead">
            <p className="text-primary">{parseFloat(selectedYear.D_Popular * 100).toFixed(2)}%</p>
            <p className="text-danger">{parseFloat(selectedYear.R_Popular * 100).toFixed(2)}%</p>
          </div>
          <div className="lead text-center mb-3 text-bold">Popular Votes</div>
        </div>
      </Col>
      <Col>
        <NomineeBox
          name={selectedYear.R_Nominee_prop}
          party="R"
          image={images.find(i => selectedYear.rep_pic === i.name)?.publicURL}
        />
      </Col>

      <Col sm="12">
        <VotesBar
          percent
          data={[
            {
              label: selectedYear.D_Nominee_prop,
              value: selectedYear.D_Popular * 100,
            },
            {
              label: selectedYear.R_Nominee_prop,
              value: selectedYear.R_Popular * 100,
            },
          ]}
        />
      </Col>
    </Row>
  );
};

const NomineeBox = ({ name, party, image }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="text-center">{name}</div>
      <div
        className="rounded-circle overflow-hidden mt-2"
        style={{
          width: '125px',
          height: '125px',
          border: `1px solid ${party === 'R' ? 'red' : 'blue'}`,
        }}
      >
        <img src={image} alt="" />
        {/* <Img fluid={image} /> */}
      </div>
    </div>
  );
};

const groupData = (data, total) => {
  const percent = d3
    .scaleLinear()
    .domain([0, total])
    .range([0, 100]);
  let cumulative = 0;
  const _data = data
    .map(d => {
      cumulative += d.value;
      return {
        value: d.value,
        cumulative: cumulative - d.value,
        label: d.label,
        percent: percent(d.value),
      };
    })
    .filter(d => d.value > 0);
  return _data;
};

const VotesBar = ({ data, percent = false }) => {
  const svgRef = useRef();

  useEffect(() => {
    const config = {
      f: d3.format('.1f'),
      margin: { top: 20, right: 0, bottom: 50, left: 0 },
      width: 900,
      height: 90,
      barHeight: 40,
      colors: ['#007bff', '#dc3545'],
    };
    const { f, margin, width, height, barHeight, colors } = config;
    const w = width;
    const h = height - margin.top - margin.bottom;
    const halfBarHeight = barHeight / 2;

    const total = d3.sum(data, d => d.value);
    const _data = groupData(data, total);

    // set up scales for horizontal placement
    const xScale = d3
      .scaleLinear()
      .domain([0, total])
      .range([0, w]);

    // create svg in passed in div
    d3.select(svgRef.current)
      .selectAll('svg')
      .remove();
    const selection = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // stack rect for each data value
    selection
      .selectAll('rect')
      .data(_data)
      .enter()
      .append('rect')
      .attr('class', 'rect-stacked')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', h / 2 - halfBarHeight)
      .attr('height', barHeight)
      .attr('width', d => xScale(d.value))
      .style('fill', (d, i) => colors[i]);

    // add values on bar
    selection
      .selectAll('.text-value')
      .data(_data)
      .enter()
      .append('text')
      .attr('class', 'text-value')
      .attr('fill', '#fff')
      .attr('font-size', '1rem')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + xScale(d.value) / 2)
      .attr('y', h / 2 + 5)
      .text(d => (percent ? d.value.toFixed(2) + '%' : d.value));
  }, [data]);

  return <div ref={svgRef}></div>;
};

const query = graphql`
  query {
    allFile {
      edges {
        node {
          name
          publicURL
        }
      }
    }
  }
`;
