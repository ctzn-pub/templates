import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from '@reach/router';
import Skeleton from '@material-ui/lab/Skeleton';
import { useEssVariable } from '../../../hooks/useEssVariable';
import { parse } from 'query-string';
import Demographics from "./Demographics"
import Infotable from './../../common/meta/Infotable'
import Meta from './../../common/meta/Meta'
import '../../styles/main.css';
 
function EssIndex() {
    const location = useLocation();
  const { v: v, c: c } = parse(location.search);

  let variable = 'happy'


  if(v){
    variable=v
  }
  const chartdata = useEssVariable(variable);

  if (!chartdata)
    return (
      <div>
        <h1>Loading</h1>

        <Skeleton variant="rect" width={'100%'} height={773} />
      </div>
    );

  let { metadata, meta2, summary_barchart, overall, demos, varimp2 } = chartdata;
  const source = {
   display: metadata.data_source.long_name, 
   url: metadata.data_source.short_name
  }
  
  return (
<div>
<h1>{metadata.title}</h1>
<Demographics 
// defaultDemo={c ? c  : null } 
                source="ess"
                overall={overall}
                demos={demos}
                varimp2={varimp2}
                units={metadata.units}
                axislabel={metadata.units + ' ' + metadata.measure}
                shortname={metadata.title}
              />{" "}
<Infotable source={source} 
time = {metadata.data_source.time_period} obs ={meta2.obs} geo={metadata.data_source.geo}  vari={variable} /> 
<Meta  metadata = {metadata}  summary_barchart={summary_barchart}/>
</div>
  );
}

export default EssIndex;
