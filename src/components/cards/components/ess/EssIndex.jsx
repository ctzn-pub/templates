import React, { useState, useEffect } from 'react';
import { useEssCardVariable } from '../../../../hooks/useEssCardVariable';
import { useEssCorrVariable } from '../../../../hooks/useEssCorrVariable';
import Bubbles from './Bubbles';
import { useStaticQuery, StaticQuery, graphql } from 'gatsby';
import classnames from 'classnames';
import Demographics from './Demographics';
import { TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import Effects from './Effects.jsx';

function EssCardIndex() {
  const [activeTab, setActiveTab] = useState('ess-happy-demographics');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const chartdata = useEssCardVariable();
  let { regressions, overall, varimp2, demos } = chartdata;

  const corrdata = useEssCorrVariable();
  let { defs, corr, fits } = corrdata;

  const metadata = useStaticQuery(graphql`
    {
      hasura2 {
        question_bank(where: { id: { _eq: "ess-happy" } }) {
          measure_description
          short_definition
          unit
        }
        dashboards(where: { cards_dashboards: { card_id: { _eq: "ess-happy" } } }) {
          id
          title
        }
      }
    }
  `);

  const bubbleData = {
    gallerygraphs_country_meta_defs: defs,
    overall: overall,
    corr: corr,
    fits: fits,
  };

  const lookup = {
    'ess-happy-correlation': (
      <Bubbles
        axislabel={
          metadata.hasura2.question_bank[0].unit +
          ' ' +
          metadata.hasura2.question_bank[0].measure_description
        }
        data={bubbleData}
        dataset={'ess'}
      />
    ),
    'ess-happy-effects': (
      <Effects
        shortname={''}
        page_title={'charts.Page_Title'}
        data={regressions}
        isBinary={metadata.hasura2.question_bank[0].unit == '%'}
        variables={varimp2}
        variable={'happy'}
        axislabel={
          metadata.hasura2.question_bank[0].unit +
          ' ' +
          metadata.hasura2.question_bank[0].measure_description
        }
      />
    ),
    'ess-happy-demographics': (
      <Demographics
        source="ess"
        overall={overall}
        demos={demos}
        variables={varimp2}
        axislabel={
          metadata.hasura2.question_bank[0].unit +
          ' ' +
          metadata.hasura2.question_bank[0].measure_description
        }
        isBinary={metadata.hasura2.question_bank[0].unit == '%'}
        shortname={metadata.hasura2.question_bank[0].short_definition}
      />
    ),
  };

  return (
    <div>
      <TabContent activeTab={activeTab}>
        {metadata.hasura2.dashboards.map(dash => (
          <TabPane tabId={dash.id}>
            {' '}
            {dash.title}
            {lookup[dash.id]}
          </TabPane>
        ))}
      </TabContent>

      <Nav tabs>
        {metadata.hasura2.dashboards.map(dash => (
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === dash.id })}
              onClick={() => {
                toggle(dash.id);
              }}
            >
              {' '}
              {dash.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
}

export default EssCardIndex;
