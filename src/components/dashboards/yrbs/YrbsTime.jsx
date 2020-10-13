import React, { useState, useEffect } from 'react';
import { useTimeTrendDemo } from '../../../hooks/useYrbsTimeTrendDemo';
import { useYrbsVariables } from '../../../hooks/useYrbsVariables';
import TimeTrend from './TimeTrend.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/main.css';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
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

console.log('data', data)
  useEffect(() => {
    if (variables) {
      const yrbsVars = variables;
      setVariablesOptions(
        yrbsVars.map(variable => ({
          value: variable.question_id,
          label: `${variable.title}`,
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
  let { title, defs ,chartdata } = data;
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <div>
        <h3> Pick a question: </h3>
        <Select
          options={variableOptions}
          value={selectedVariable}
          onChange={v => setSelectedVariable(v)}
          classNamePrefix="react-select"
        />
      </div>

      <TimeTrend  title={title} chartdata={chartdata} defs={defs} />
    </div>
  );
}

export default YrbsTime;
