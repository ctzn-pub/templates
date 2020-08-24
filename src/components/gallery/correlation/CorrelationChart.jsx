import React, { useRef, useState, useEffect } from 'react';
import Bubble from './Bubble';
import BubbleEmpty from './BubbleEmpty';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CultureIcon from '../../images/culture.svg';
import DiversityIcon from '../../images/diversity.svg';
import InequalityIcon from '../../images/inequality.svg';
import WealthIcon from '../../images/wealth.svg';

function CorrelationChart({ data, axislabel, subGraphId }) {
  const hdiRef = useRef();
  const gdpRef = useRef();
  const educationRef = useRef();
  const gender_inequalityRef = useRef();
  const giniRef = useRef();
  const inequality_LERef = useRef();
  const ethnicRef = useRef();
  const linguisticRef = useRef();
  const religiousRef = useRef();
  const pdiRef = useRef();
  const idvRef = useRef();
  const masRef = useRef();

  const chartsRefs = [
    hdiRef,
    gdpRef,
    educationRef,
    gender_inequalityRef,
    giniRef,
    inequality_LERef,
    ethnicRef,
    linguisticRef,
    religiousRef,
    pdiRef,
    idvRef,
    masRef,
  ];
  const [activeTab, setActiveTab] = useState(subGraphId || 'wealth');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  if (typeof window === `undefined`) return null;

  return (
    // <GraphWrapper
    //   id={'correlation'}
    //   selectedDemographic={{
    //     id: activeTab,
    //     name: activeTab,
    //   }}
    // >
    <>
      <Nav tabs className="justify-content-center mb-2">
        <NavItem>
          <NavLink
            tag="div"
            className={classnames('d-flex align-items-center h-100 w-100 ml-2 ', {
              active: activeTab === 'wealth',
            })}
            onClick={() => {
              toggle('wealth');
            }}
          >
            <WealthIcon
              style={{ width: '30px', height: '30px' }}
              fill={activeTab === 'wealth' ? '#ff7a21' : '#000000'}
            />
            <div className="tabname">Wealth</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="div"
            className={classnames('d-flex align-items-center h-100 w-100 ', {
              active: activeTab === 'inequality',
            })}
            onClick={() => {
              toggle('inequality');
            }}
          >
            <InequalityIcon
              style={{ width: '30px', height: '30px' }}
              fill={activeTab === 'inequality' ? '#ff7a21' : '#000000'}
            />
            <div className="tabname">Inequality</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="div"
            className={classnames('d-flex align-items-center h-100 w-100', {
              active: activeTab === 'diversity',
            })}
            onClick={() => {
              toggle('diversity');
            }}
          >
            <DiversityIcon
              style={{ width: '30px', height: '30px' }}
              fill={activeTab === 'diversity' ? '#ff7a21' : '#000000'}
            />
            <div className="tabname">Diversity</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="div"
            className={classnames('d-flex align-items-center h-100 w-100', {
              active: activeTab === 'cultural',
            })}
            onClick={() => {
              toggle('cultural');
            }}
          >
            <CultureIcon
              style={{ width: '30px', height: '30px' }}
              fill={activeTab === 'Cultural' ? '#ff7a21' : '#000000'}
            />{' '}
            <div className="tabname">Cultural</div>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="wealth">
          <div className="l-body-outset">
            <div className="row">
              <div className="col-12 col-md-4 ">
                <Bubble type="hdi" chartRef={hdiRef} axislabel={axislabel} data={data} />
              </div>
              <div className="col-12 col-md-4 ">
                <Bubble type="gdp" chartRef={gdpRef} axislabel={axislabel} data={data} />
              </div>
              <div className="col-12 col-md-4 ">
                <Bubble
                  type="education"
                  chartRef={educationRef}
                  axislabel={axislabel}
                  data={data}
                />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="inequality">
          <div className="row">
            <div className="col-12 col-md-4 ">
              <Bubble
                chartRef={gender_inequalityRef}
                type="gender_inequality"
                axislabel={axislabel}
                data={data}
              />
            </div>
            <div className="col-12 col-md-4 ">
              <Bubble type="gini" chartRef={giniRef} axislabel={axislabel} data={data} />
            </div>
            <div className="col-12 col-md-4 ">
              <Bubble
                chartRef={inequality_LERef}
                type="inequality_LE"
                axislabel={axislabel}
                data={data}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tabId="diversity">
          <div className="l-body-outset">
            <div className="row">
              <div className="col-12 col-md-4 ">
                <Bubble type="ethnic" chartRef={ethnicRef} axislabel={axislabel} data={data} />
              </div>
              <div className="col-12 col-md-4 ">
                <Bubble
                  type="linguistic"
                  chartRef={linguisticRef}
                  axislabel={axislabel}
                  data={data}
                />
              </div>
              <div className="col-12 col-md-4 ">
                <Bubble
                  type="religious"
                  chartRef={religiousRef}
                  axislabel={axislabel}
                  data={data}
                />
              </div>
            </div>{' '}
          </div>{' '}
        </TabPane>
        <TabPane tabId="cultural">
          <div className="l-body-outset">
            <div className="row">
              <div className="col-12 col-md-4 ">
                <Bubble type="pdi" chartRef={pdiRef} axislabel={axislabel} data={data} />
              </div>
              <div className="col-12 col-md-4 ">
                <Bubble type="idv" chartRef={idvRef} axislabel={axislabel} data={data} />
              </div>
              <div className="col-12 col-md-4 ">
                <Bubble type="mas" chartRef={masRef} axislabel={axislabel} data={data} />
              </div>
            </div>
          </div>
        </TabPane>
      </TabContent>
      <BubbleEmpty
        type="idv"
        chartRef={null}
        axislabel={axislabel}
        data={data}
        showLegend={true}
        chartsRefs={chartsRefs}
      />
    </>
  );
}

export default CorrelationChart;
