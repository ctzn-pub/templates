import React, { useState } from 'react';
import Interactions from './graphs/Interactions';
import MarginalEffect from './graphs/MarginalEffect';
import VariableSummery from './graphs/VariableSummery';
import { graphql, useStaticQuery } from 'gatsby';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import marginalEffectImage from '../../images/marginalEffect.jpg';
import interactionsImage from '../../images/interactions.jpg';
import varSummaryImage from '../../images/varSummary.jpg';

import './singleVar.css';

function SingleVariable() {
  let {
    hasura: { question_bank: metadata },
  } = useStaticQuery(query);
  metadata = metadata[0];

  const [activeTab, setActiveTab] = useState('var_summery');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div
      className="border rounded dash_card"
      style={{
        width: 900,
      }}
    >
      <div className="border-bottom p-3">
        <div className="h4">{metadata.title}</div>
      </div>
      <div className="dash_card_body border-bottom p-3">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="var_summery">
            <VariableSummery metadata={metadata} />
          </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="marginal_effect">
            <MarginalEffect variable={metadata.title} />
          </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="interactions">
            <Interactions />
          </TabPane>
        </TabContent>
      </div>
      <div className=" d-flex justify-content-end p-3">
        <div className="d-flex justify-content-between col-8 px-4 align-items-center">
          <GraphBox
            text="Variable Summary"
            link="var_summery"
            toggle={toggle}
            img={varSummaryImage}
            activeTab={activeTab}
          />
          <GraphBox
            text="Marginal Effect"
            link="marginal_effect"
            toggle={toggle}
            img={marginalEffectImage}
            activeTab={activeTab}
          />
          <GraphBox
            text="Interactions"
            link="interactions"
            toggle={toggle}
            img={interactionsImage}
            activeTab={activeTab}
          />
        </div>
        <div className="col-4 single_var_side_note">
          <div>
            <h6>Technical Notes</h6>
            <p>
              This pane shows the results from a model <strong>{metadata.title}</strong> ~ Politics
              * (demographic), controlling for other demographics
            </p>
          </div>
          <div>
            <h6>Data Source</h6>
            <p>
              This chart uses data derived from <strong>{metadata.data_source.long_name}</strong>.
            </p>
          </div>
          <div>
            <h6>Original Question</h6>
            <p>{metadata.question_text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleVariable;

const GraphBox = ({ text, link, toggle, img, activeTab }) => (
  <div
    onClick={() => toggle(link)}
    className={classnames(
      'graphBox text-center border d-flex flex-column justify-content-between rounded p-2',
      {
        active: activeTab === link,
      }
    )}
    style={{
      width: '30%',
      height: '200px',
    }}
  >
    <img
      src={img}
      // className={classnames('w-100')}
      // style={{
      //   //   height: '150px',
      //   width: '150px',
      // }}
    />
    <div classname="mt-2">{text}</div>
  </div>
);

const query = graphql`
  {
    hasura {
      question_bank(
        where: { source: { _eq: "vsg" }, question_id: { _eq: "gender_attitudes_maleboss" } }
      ) {
        measure
        question_text
        scale_original
        data_source {
          long_name
        }
        transformation
        units
        title
      }
    }
  }
`;
