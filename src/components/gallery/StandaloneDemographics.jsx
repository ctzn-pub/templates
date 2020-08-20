import React, { useState, useRef } from 'react';
import DemoChart from './StandaloneDemoChart';

import classnames from 'classnames';
import Left from '../images/leftarrow.svg';
import Right from '../images/rightarrow.svg';

import { FaShareAlt } from 'react-icons/fa';
function Demographics({
  overall,
  demos,
  variables,
  shortname,
  isBinary,
  axislabel,
  showShareModal,
  showSaveModal,
  source,
  variable,
}) {
  const ranks = variables;

  const demoContainer = useRef();
  const [selectedDemo, setSelectedDemo] = useState(ranks[0]);

  const [selectedDemoLevels, setSelectedDemoLevels] = useState([
    ...new Set(
      demos.filter(d => d.demometum.dmeta === selectedDemo.display_name).map(d => d.level)
    ),
  ]);
  const onDemographicChange = demo => {
    setSelectedDemoLevels([
      ...new Set(demos.filter(d => d.demometum.dmeta === demo.display_name).map(d => d.level)),
    ]);

    setSelectedDemo(demo);
  };

  console.log('selectedDemoLevels', selectedDemoLevels);
  return (
    <div className="container flex-column my-4" style={{ height: '100%' }} id="trend">
      <div className="d-flex align-items-center">
        <div
          onClick={() => {
            sideScroll('left', 25, 200, 10, demoContainer);
          }}
          style={{
            cursor: 'pointer',
          }}
        >
          {/* <img src={left} alt="" /> */}
          <Left
            style={{
              height: '20px',
              width: '20px',
            }}
          />
        </div>
        <div className="demo-container d-flex flex-nowrap mx-1" ref={demoContainer}>
          {ranks.map((demo, i) => (
            <div
              key={demo.display_name}
              onClick={() => {
                onDemographicChange(demo);
              }}
              className={classnames('demo-pills', {
                'active-pill': selectedDemo?.display_name === demo.display_name,
              })}
            >
              {/* <i className={demo.demographics_metum.icon + " fas mr-2"}></i> */}
              {demo.display_name}
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

      <DemoChart
        isBinary={isBinary}
        overall={overall}
        demos={demos}
        axislabel={axislabel}
        title={shortname}
        rank={selectedDemo}
        key={selectedDemo.display_name}
        levels={selectedDemoLevels}
      />
    </div>
  );
}

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

export default Demographics;
