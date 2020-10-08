import React, { useState, useRef } from 'react';
import { useSplitBarD } from '../../../hooks/useSplitBarD';
import { useSplitBarDemo } from '../../../hooks/useSplitBarDemo';
import Left from '../../images/leftarrow.svg';
import Right from '../../images/rightarrow.svg';
import classnames from 'classnames';
import SplitBarChart from './SplitBarChart';
import Skeleton from '@material-ui/lab/Skeleton';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';

function SplitBar() {
  const location = useLocation();
  const { v: v, d: d } = parse(location.search);
  // const [chartData , setChartData] = useState(null)
  console.log('v', v);
  const chartdata = useSplitBarD(v ? v : 'news_sources');

  const demos = useSplitBarDemo();

  const [selectedDemo, setSelectedDemo] = useState(demos[0]);
  const [selectedDemoObj, setSelectedDemoObj] = useState(demos[0]);

  // const [selectedDemoLevels, setSelectedDemoLevels] = useState([
  //   ...new Set(data.filter(d => d.demo === selectedDemo.displayname).map(d => d.level)),
  // ]);

  const [selectedDemoLevels, setSelectedDemoLevels] = useState(['Democrat', 'Republican']);
  const demoContainer = useRef();
  const demosDisplay = [...new Set(demos.map(a => a.displayname))];

  const onDemographicChange = demo => {
    const change = demos.find(node => node.displayname === demo);
    setSelectedDemoLevels([
      ...new Set(chartdata.data.filter(d => d.demo === change.demo).map(d => d.level)),
    ]);
    setSelectedDemo(change);
    setSelectedDemoObj(demos.find(a => a.demo === change.demo));
  };

  if (!chartdata)
    return (
      <div>
        <h1>Loading</h1>

        <Skeleton variant="rect" width={'100%'} height={773} />
      </div>
    );

  let { card, metadata, overall, data } = chartdata;
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <div
        className="border rounded dash_card"
        style={{
          width: 900,
        }}
      >
        <div className="border-bottom p-3">
          <div className="h3" style={{ fontFamily: 'Georgia' }}>
            {card.title}
          </div>
        </div>
        <div className="dash_card_body border-bottom p-3">
          <div className="d-flex align-items-center">
            <div
              onClick={() => {
                sideScroll('left', 25, 200, 10, demoContainer);
              }}
              style={{
                cursor: 'pointer',
              }}
            >
              <Left
                style={{
                  height: '20px',

                  width: '20px',
                }}
              />
            </div>
            <div className="demo-container d-flex flex-nowrap mx-1" ref={demoContainer}>
              {demosDisplay.map((demo, i) => (
                <div
                  key={demo}
                  onClick={() => {
                    onDemographicChange(demo);
                  }}
                  className={classnames('demo-pills', {
                    'active-pill': selectedDemo.displayname === demo,
                  })}
                >
                  {demo}
                </div>
              ))}
            </div>
            <div
              onClick={() => {
                sideScroll('right', 25, 200, 10, demoContainer);
              }}
              style={{
                cursor: 'pointer',
              }}
            >
              <Right
                style={{
                  height: '20px',
                  width: '20px',
                }}
              />
            </div>
          </div>
          <SplitBarChart
            data={data.filter(d => d.demo === selectedDemo.demo)}
            levels={selectedDemoLevels}
            colors={[selectedDemoObj.color2, selectedDemoObj.color1]}
            title={metadata.question_text}
            demo={selectedDemo.displayname}
            overall={overall}
            yLabel={`${metadata.units} ${metadata.measure}`}
            source={metadata?.data_source?.long_name}
          />
        </div>

        <div className=" d-flex justify-content-end p-3"></div>
      </div>
    </div>
  );
}

export default SplitBar;

function sideScroll(direction, speed, distance, step, demoContainer) {
  let scrollAmount = 0;
  var slideTimer = setInterval(function() {
    if (direction == 'left') {
      demoContainer.current.scrollLeft -= step;
    } else {
      demoContainer.current.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}
