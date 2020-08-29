import React, { useRef, useState, useEffect } from 'react';
import { useCountyElectionData } from '../../../hooks/useCountyelectionData';
import { useYears } from '../../../hooks/useYears';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../styles/main.css';

function CountyHistory() {
  const variables = useYears();
  const [selectedVariable, setSelectedVariable] = useState({ value: 2016 });
  const [variableOptions, setVariablesOptions] = useState([]);

  const data = useCountyElectionData(selectedVariable?.value);

  useEffect(() => {
    if (variables) {
      const electionYears = variables;
      setVariablesOptions(
        electionYears.map(variable => ({
          value: variable.Year,
          dem: variable.D_Nominee_prop,
          rep: variable.R_Nominee_prop,
          label: `${variable.R_Nominee_prop} vs. ${variable.D_Nominee_prop} (${variable.Year})`,
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
        <Skeleton variant="rect" width={500} height={400} />
      </div>
    );
  let { counties } = data.data;

  const opts = variableOptions.find(obj => {
    return obj.value == selectedVariable.value;
  });

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
        <h1>
          {opts.rep} vs. {opts.dem}
        </h1>

        <h2>{opts.value}</h2>
      </div>
    </div>
  );
}

export default CountyHistory;
