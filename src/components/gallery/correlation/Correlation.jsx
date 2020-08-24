import React, { useRef, useState, useEffect } from 'react';
import { useVariables } from '../../../hooks/useVariables';

import CorrelationChart from './CorrelationChart';

// icons

import { useCorrelationData } from '../../../hooks/useCorrelationData';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import Skeleton from '@material-ui/lab/Skeleton';
// import '../../styles/report.css';
import '../../styles/main.css';
// import GraphWrapper from '../../GraphWrapper';

function Correlation() {
  const variables = useVariables();
  const [selectedVariable, setSelectedVariable] = useState({ value: 'happy', label: 'happiness' });
  const [variableOptions, setVariablesOptions] = useState([]);
  // const [chartData , setChartData] = useState(null)

  const data = useCorrelationData(selectedVariable?.value);

  useEffect(() => {
    if (variables) {
      const essVars = variables.filter(v => v.source === 'ESS');
      setVariablesOptions(
        essVars.map(variable => ({
          value: variable.var,
          label: `${variable.shortname} (${variable.var})`,
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
        <Skeleton variant="rect" width={800} height={400} />
      </div>
    );
  let {
    metadata,

    overall,
    corr,
    fits,
  } = data.data;
  const bubbleData = {
    gallerygraphs_country_meta_defs: data.gallerygraphs_country_meta_defs,
    overall: overall,
    corr: corr,
    fits: fits,
  };
  let { axislabel } = metadata;

  return (
    <div
      style={{
        width: 900,
      }}
    >
      <div>
        <Select
          options={variableOptions}
          value={selectedVariable}
          onChange={v => setSelectedVariable(v)}
          classNamePrefix="react-select"
        />
      </div>
      <CorrelationChart data={bubbleData} key={selectedVariable.value} axislabel={axislabel} />
    </div>
  );
}

export default Correlation;
