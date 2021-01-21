import React, { useState, useEffect } from 'react';
import TimeTrend from './TimeTrend.jsx';
import Effects from './Effects.jsx';
import { useGssCardVariable } from '../../../../hooks/useGssCardVariable'
import { useStaticQuery, StaticQuery, graphql } from 'gatsby';
import classnames from 'classnames';

import {  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

function GssCardIndex() {

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
const chartdata = useGssCardVariable()
  let { timetrend, variableimportance, regressions } = chartdata;

  const metadata = useStaticQuery(graphql`
    query{
      hasura2 {
       question_bank(where: {id: {_eq: "gss-happy"}}){
         measure_description
         unit
       }
      timetrend: dashboards(where: {id: {_eq: "gss-happy-timetrend"}}) {
         id
         title
       }
     effects: dashboards(where: {id: {_eq: "gss-happy-effects"}}) {
         id
         title
       }
     }
  }
  `
   )
  



  return (
    <div>


 

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <TimeTrend
        data={timetrend}
        variables={variableimportance}
        axislabel={metadata.hasura2.question_bank[0].unit+ ' ' + metadata.hasura2.question_bank[0].measure_description}
        shortname={metadata.hasura2.timetrend[0].title}
        variable={'happy'}
      /> 
        </TabPane>
        <TabPane tabId="2">
          Marginal Effects
          <Effects
                  shortname={metadata.hasura2.effects[0].title}
                  page_title={'charts.Page_Title'}
                  data={regressions}
                  isBinary={metadata.hasura2.question_bank[0].unit == "%" }
                  variables={variableimportance}
                  variable={'happy'}
                  axislabel={metadata.hasura2.question_bank[0].unit+ ' ' + metadata.hasura2.question_bank[0].measure_description}
                /> 
        </TabPane>
      </TabContent>
 
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
    Timetrend
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
Marginal Effects
          </NavLink>
        </NavItem>
      </Nav>



 
    </div>
  );
}

export default GssCardIndex;
