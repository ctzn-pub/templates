import React, { useState, useEffect } from 'react';
import { useTimeTrendDemo } from '../../../hooks/useScfTimeTrendDemo';
import { useAnesVariables } from '../../../hooks/useScfVariables';
import TimeTrend from './TimeTrend.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/main.css';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
function ScfTime() {
  const location = useLocation();
  const { v: v, d: d } = parse(location.search);
  console.log('v', v);

  console.log('d', d);
  const variables = useAnesVariables();
  const [selectedVariable, setSelectedVariable] = useState({
    value: 'Before_Tax_Income',
    label: 'Before Tax Income',
  });
  const [variableOptions, setVariablesOptions] = useState([]);
  // const [chartData , setChartData] = useState(null)

  const data = useTimeTrendDemo(selectedVariable?.value);

  useEffect(() => {
    if (variables) {
      const scfVars = variables;
      setVariablesOptions(
        scfVars.map(variable => ({
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
  let { alldata, defs ,chartdata } = data;
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

      <TimeTrend alldata={alldata}  chartdata={chartdata} defs={defs} />
    </div>
  );
}

export default ScfTime;
