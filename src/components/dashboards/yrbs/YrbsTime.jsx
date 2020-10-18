import React, { useState, useEffect } from 'react';
import { useTimeTrendDemo } from '../../../hooks/useYrbsTimeTrendDemo';
import { useYrbsVariables } from '../../../hooks/useYrbsVariables';
import TimeTrend from './TimeTrend.jsx';
import OverallTimeTrend from './OverallTimeTrend.jsx';
import Facet from './Facet.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/main.css';
import styled from 'styled-components';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
import Time from './../../../images/icons/Time.svg'
import Gender from './../../../images/icons/Gender.svg'
import Info from './../../../images/icons/Info.svg'
import Infotable from './../../common/meta/Infotable'

function YrbsTime() {
  const location = useLocation();
  const { v: v, d: d } = parse(location.search);
  const variables = useYrbsVariables();
  const [selectedVariable, setSelectedVariable] = useState({
    value: 'qn8',
    label: 'Rarely or never wore a seat belt',
  });
  const [variableOptions, setVariablesOptions] = useState([]);
  const data = useTimeTrendDemo(selectedVariable?.value);
  const [showTab, setShowTab] = useState( 'tab3');
  const [showInfo, setShowInfo] = useState(false);

const Butt = styled.button`
border-right: 1px solid #dee2e6!important;
border-left: 1px solid #dee2e6!important;
border-bottom: none;
border-top: none;
display: -ms-flexbox;
display: flex;
background-color: #fff;
font-size: 12px;
margin: 0;
color: #000;
-webkit-transition: all 0.3s ease 0s;
transition: all 0.3s ease 0s;
border-width: 0 1px 0 1px 0;
/* border-radius: 5px; */
padding: 1rem;
:hover {
  background-color: #333a40 !important;
  border: 1px solid #333a40 !important;
}
`
  useEffect(() => {
 
    if (variables) {
      const opts = [...new Set(variables.map(a => a.tags))];

      setVariablesOptions(
        opts.map(head => ({
          label: head,
           options: variables.filter(v => v.tags == head ).map(variable => ({
            value: variable.question_id,
            label: `${variable.title}`,
          }))
          
          }))
      );
    }
    
  }, [variables]);

  if (!data)
    return (
      <div>
        <div>
          <Select
            options={variableOptions}
            value={selectedVariable}
            onChange={v => setSelectedVariable(v)}
            classNamePrefix="react-select"
          />
        </div>
        <h1>Loading</h1>
        <Skeleton variant="rect" width={'100%'} height={773} />
      </div>
    );
  let { meta, defs ,chartdata,facet , overall } = data;
  return (
<div style={{ width: '100%' }}>
      <div>
        <h3> Pick a question: </h3>
        <Select
          options={variableOptions}
          value={selectedVariable}
          onChange={v => setSelectedVariable(v)}
          classNamePrefix="react-select"
        />
      </div> 

  <div className="border rounded dash_card" style={{  width: '100%'  }} >
    <div className="border-bottom">
    <div style={{display: "flex"}}>
      <div className="h3" style={{ fontFamily: 'Georgia', padding: "1rem" }}>
        {meta.title} 
      </div>

{    meta.count > 6 &&      <Butt onClick={butt=>setShowTab('tab1')}> <Time fill= "#000000" height='30px' width="30px" /> Time Trend</Butt>
}
{    meta.count > 7 &&   <Butt onClick={butt=>setShowTab('tab2')} style={{minWidth: "127px"}}>  <Gender fill= "#000000" height='30px' width="30px"  />  <span>Interaction</span> </Butt>}
{    meta.count > 6 &&      <Butt onClick={butt=>setShowTab('tab3')}> <Time fill= "#000000" height='30px' width="30px" /> Overall Trend</Butt> } 


<Butt onClick={butt=>setShowInfo(!showInfo)}>  <Info fill= "#000000" height='30px' width="20px" style={{marginRight: "3px"}} /> { ' ' }Details  </Butt>

      </div>
    </div>
  <div className="dash_card_body border-bottom p-3"> 
  
    {showTab == 'tab1' && meta.count > 6 &&   <TimeTrend  title={meta.title} chartdata={chartdata}  overall={overall} axis={meta.measure}  defs={defs} />}
    {showTab == 'tab2' || meta.count < 7  ?   <Facet  title={meta.title} axis={meta.measure} facet={facet}  /> : ''}
    {showTab == 'tab3' && meta.count > 6 &&   <OverallTimeTrend  title={meta.title} overall={overall} axis={meta.measure} />}

    {showInfo == true &&  <Infotable source={'YRBSS'} 
time = {'1990-2019'} obs ={'217340'} geo={'United Stated'}  vari={selectedVariable.value} /> }
 
  </div>
  </div>
  </div>
  );
}

export default YrbsTime;
