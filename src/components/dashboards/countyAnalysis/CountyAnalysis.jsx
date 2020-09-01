import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import DiscreteMap from '../../gallery/highmaps/DiscreteMap';
import BubbleMap from '../../gallery/BubbleMap';
import SpikeMap from '../../gallery/SpikeMap';
import Img from 'gatsby-image';

import { useYears } from '../../../hooks/useYears';
import { useCountyElectionData } from '../../../hooks/useCountyelectionData';
function CountyAnalysis() {
  const years = useYears();

  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const [activeTab, setActiveTab] = useState('Choropleth');
  const data = useCountyElectionData(selectedYear.Year);

  const imagesQueryData = useStaticQuery(query);
  const images = imagesQueryData.allFile.edges.map(y => y.node);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (!data) return 'loading';

  const { counties, states } = data;
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
          <TabContent activeTab={activeTab}>
            <TabPane tabId="Choropleth">
              <DiscreteMap counties={counties} states={states} />
            </TabPane>
          </TabContent>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="Bubble">
              <BubbleMap data={counties} />
            </TabPane>
          </TabContent>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="Spiky">
              <SpikeMap data={counties} />
            </TabPane>
          </TabContent>
        </div>
        <div className="p-3 dash_card_footer">footer</div>
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
      <Col>
        <NomineeBox
          name={selectedYear.D_Nominee_prop}
          party="D"
          image={images.find(i => selectedYear.dem_pic === i.name).publicURL}
        />
      </Col>
      <Col>
        <div className>
          <div className="d-flex justify-content-around w-100 display-4">
            <p className="text-primary">{selectedYear.D_EV_Total}</p>
            <p className="text-danger">{selectedYear.R_EV_Total}</p>
          </div>
          <div className="lead text-center mb-3">Popular Votes:</div>
          <div className="d-flex justify-content-around w-100 lead">
            <p className="text-primary">{parseFloat(selectedYear.D_Popular * 100).toFixed(2)}%</p>
            <p className="text-danger">{parseFloat(selectedYear.R_Popular * 100).toFixed(2)}%</p>
          </div>
        </div>
      </Col>
      <Col>
        <NomineeBox
          name={selectedYear.R_Nominee_prop}
          party="R"
          image={images.find(i => selectedYear.rep_pic === i.name).publicURL}
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
