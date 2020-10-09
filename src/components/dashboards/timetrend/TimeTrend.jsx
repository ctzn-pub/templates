import React, { useState, useRef } from 'react';
import { useTimeTrendDemo } from '../../../hooks/useTimeTrendDemo';
import Left from '../../images/leftarrow.svg';
import Right from '../../images/rightarrow.svg';
import classnames from 'classnames';
import TimeTrendChart from './TimeTrendChart.jsx';

function TimeTrend({ meta, chartdata, demos }) {
 
  
  const data = chartdata.map(d => Object.freeze(d));
  const [selectedDemo, setSelectedDemo] = useState(demos[3]);
  const [selectedDemoObj, setSelectedDemoObj] = useState(demos[3]);
  const colors = [selectedDemoObj.color2, selectedDemoObj.color1];

  const [selectedDemoLevels, setSelectedDemoLevels] = useState([
    ...new Set(data.filter(d => d.demo === selectedDemo.demo).map(d => d.level)),
  ]);
  const demoContainer = useRef();
  const demosDisplay = [...new Set(demos.map(a => a.display))];

  const onDemographicChange = demo => {
    const change = demos.find(node => node.display === demo);
    setSelectedDemoLevels([...new Set(data.filter(d => d.demo === change.demo).map(d => d.level))]);
    setSelectedDemo(change);
    setSelectedDemoObj(demos.find(a => a.demo === change.demo));
  };

  return (
    <div>
      {/* // <h1>Trends over time</h1> */}
      <div
        className="border rounded dash_card"
        style={{
          width: '100%',
        }}
      >
        <div className="border-bottom p-3">
          <div className="h3" style={{ fontFamily: 'Georgia' }}>
            {meta.title}
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
                    'active-pill': selectedDemo.display === demo,
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

          <TimeTrendChart
            data={data.filter(d => d.demo === selectedDemo.demo)}
            levels={selectedDemoLevels}
            colors={colors}
            title={meta.question_text}
            demo={selectedDemo.display}
            yLabel={`${meta.units} ${meta.measure}`}
            //  source={metadata?.data_source?.long_name}
          />
        </div>
      </div>
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

export default TimeTrend;
