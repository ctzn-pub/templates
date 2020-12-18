import React, { useState, useEffect } from 'react';
import TimeTrend from './TimeTrend.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from '@reach/router';
import Skeleton from '@material-ui/lab/Skeleton';
import { useGssVariable } from '../../../hooks/useGssVariable';
import { parse } from 'query-string';
import Infotable from './../../common/meta/Infotable';
import Meta from './../../common/meta/Meta';
import '../../styles/main.css';

function GssIndex() {
  const location = useLocation();
  const { v = 'happy', c } = parse(location.search);

  const chartdata = useGssVariable(v);

  if (!chartdata)
    return (
      <div>
        <h1>Loading</h1>

        <Skeleton variant="rect" width={'100%'} height={773} />
      </div>
    );

  let { metadata, timetrend, meta2, summary_barchart, variableimportance } = chartdata;
  const source = {
    display: metadata.data_source.long_name,
    url: metadata.data_source.short_name,
  };
  return (
    <div>
      <h1>{metadata.title}</h1>
      <a
        href={`https://colab.research.google.com/github/ctzn-pub/colab_files/blob/main/${v}-timetrend.ipynb`}
        target="_blanc"
      >
        <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" />
      </a>
      <TimeTrend
        data={timetrend}
        variables={variableimportance}
        axislabel={metadata.units + ' ' + metadata.measure}
        shortname={metadata.title}
        variable={v}
      />

      <Infotable
        source={source}
        time={meta2.min + '-' + meta2.max}
        obs={meta2.obs}
        geo={metadata.data_source.geo}
        vari={v}
      />
      <Meta metadata={metadata} summary_barchart={summary_barchart} />
    </div>
  );
}

export default GssIndex;
