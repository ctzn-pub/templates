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
    hasura: { question_bank: metadata, frequency },
  } = useStaticQuery(query);
  metadata = metadata[0];

  const [activeTab, setActiveTab] = useState('marginal_effect');
  const [selectedDemo, setSelectedDemo] = useState();

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
            <MarginalEffect variable={metadata.title} setTechnicalNotesDemo={setSelectedDemo} />
          </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="interactions">
            <Interactions setTechnicalNotesDemo={setSelectedDemo} />
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
        <TechnicalNotes
          metadata={metadata}
          frequency={frequency}
          activeTab={activeTab}
          selectedDemo={selectedDemo}
        />
      </div>
    </div>
  );
}

export default SingleVariable;

const TechnicalNotes = ({ metadata, activeTab, frequency, selectedDemo }) => {
  if (activeTab === 'var_summery') {
    return (
      <div className="col-4 single_var_side_note">
        <div>
          <h6>Technical Notes</h6>
          <p>
            Total # of observations:{' '}
            <strong>
              {frequency.reduce((acc, d) => acc + d.count, 0).toLocaleString('en-US')}
            </strong>
          </p>
        </div>
        <div>
          <h6>Original Scale</h6>
          <p>{metadata.scale_original}</p>
        </div>
        <div>
          <h6>Transformation</h6>
          <p>{metadata.transformation}</p>
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
    );
  } else if (activeTab === 'marginal_effect') {
    // Panel 2 (Marginal Effects) let's make the plots a little short.
    //  the titles should be 'displayname' (I left it out of the query
    //    ... oops :pensive: by addcident, I added to the snippet in
    //    notion too) . Technical notes here are ' This pane shows the
    //    results from a model Preference for Male Bosses ~ demographics.
    //     controlling for other demographics.

    return (
      <div className="col-4 single_var_side_note">
        <div>
          <h6>Technical Notes</h6>
          <p>
            This pane shows the results from a model <strong>{metadata.title}</strong>{' '}
            {selectedDemo ? '~ ' + selectedDemo : ''} , controlling for other demographics
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
    );
  } else if (activeTab === 'interactions') {
    // Interactions: the ordering for education is off but I will try to change that in the db.
    //  Colors should be blue (democrat) and red (republican) ..also are we definitng the names too ??
    //   & Can '(demographic) ' in the technical notes here be the chosen
    // tab (Age, Gun Owner, Education, etc)  ?

    return (
      <div className="col-4 single_var_side_note">
        <div>
          <h6>Technical Notes</h6>
          <p>
            This pane shows the results from a model <strong>{metadata.title}</strong>{' '}
            {selectedDemo ? '~ ' + selectedDemo : ''} , controlling for other demographics
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
    );
  }
};
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
      frequency(where: { source: { _eq: "vsg" }, variable: { _eq: "gender_attitudes_maleboss" } }) {
        count
      }
    }
  }
`;
