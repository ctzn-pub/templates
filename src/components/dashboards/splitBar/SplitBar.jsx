import React, { useState, useRef } from 'react';
import { useSplitData } from '../../../hooks/useSplitBarData';
import { useSplitBarDemo } from '../../../hooks/useSplitBarDemo';
import Left from '../../images/leftarrow.svg';
import Right from '../../images/rightarrow.svg';
import classnames from 'classnames';
import SplitBarChart from './SplitBarChart';

import 'bootstrap/dist/css/bootstrap.min.css';
function SplitBar() {
  const { data, metadata, overall } = useSplitData();
  console.log({ metadata });
  const demos = useSplitBarDemo();

  const [selectedDemo, setSelectedDemo] = useState(demos[0].demo);
  const [selectedDemoObj, setSelectedDemoObj] = useState(demos[0]);

  const [selectedDemoLevels, setSelectedDemoLevels] = useState([
    ...new Set(data.filter(d => d.demo === selectedDemo).map(d => d.level)),
  ]);

  const demoContainer = useRef();
  const demosDisplay = [...new Set(demos.map(a => a.displayname))];

  const onDemographicChange = demo => {
    setSelectedDemoLevels([...new Set(data.filter(d => d.demo === demo).map(d => d.level))]);
    setSelectedDemo(demo);
    setSelectedDemoObj(demos.find(a => a.demo === demo));
  };

  return (
    <>
      <div
        className="border rounded dash_card p-3 "
        style={{
          width: 900,
        }}
      >
        <div className="lead p-4">{metadata.measure}</div>
        <div className=" dash_card_body border-bottom">
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
                    'active-pill': selectedDemo === demo,
                  })}
                >
                  {/* <i className={demo.demographics_metum.icon + ' fas mr-2'}></i> */}
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
          {/* {!data || loading || loadingQuery ? ( */}
          {/* <>
                <h1 className="text-center">Loading</h1>
                <Skeleton variant="rect" width={900} height={500} />
              </>
            ) : ( */}

          <SplitBarChart
            data={data.filter(d => d.demo === selectedDemo)}
            levels={selectedDemoLevels}
            colors={[selectedDemoObj.color1, selectedDemoObj.color2]}
            title={metadata.question_text}
            demo={selectedDemo}
            overall={overall}
            yLabel={`${metadata.units} ${metadata.measure}`}
            source={metadata?.data_source?.long_name}
          />
        </div>
      </div>
    </>
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
