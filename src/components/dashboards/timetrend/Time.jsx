import React, { useState, useEffect } from 'react';
import { useTimeTrendDemo } from '../../../hooks/useTimeTrendDemo';
import { useAnesVariables } from '../../../hooks/useAnesVariables';
import TimeTrend from './TimeTrend.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/main.css';

function Time() {
  const variables = useAnesVariables();
  const [selectedVariable, setSelectedVariable] = useState({
    value: 'VCF0310',
    label: 'Interest in Politics',
  });
  const [variableOptions, setVariablesOptions] = useState([]);
  // const [chartData , setChartData] = useState(null)

  const data = useTimeTrendDemo(selectedVariable?.value);
  useEffect(() => {
    if (variables) {
      const anesVars = variables;
      setVariablesOptions(
        anesVars.map(variable => ({
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
  let { meta, chartdata, demos } = data;
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

      <TimeTrend meta={meta} chartdata={chartdata} demos={demos} />
    </div>
  );
}

export default Time;
