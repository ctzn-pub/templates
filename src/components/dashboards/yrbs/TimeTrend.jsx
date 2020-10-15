import React, { useState, useRef } from 'react';
import Left from '../../images/leftarrow.svg';
import Right from '../../images/rightarrow.svg';
import classnames from 'classnames';
import styled from 'styled-components';
import TimeTrendChart from './TimeTrendChart.jsx';

function TimeTrend({chartdata, title, defs} ) {
  const data = chartdata.map(d => Object.freeze(d));
  const demos = defs;
  const starting = demos.find(element => element.demo == 'race4');

  const [selectedDemo, setSelectedDemo] = useState(starting);
  const [selectedDemoObj, setSelectedDemoObj] = useState(starting);
  const colors = [
    selectedDemoObj.color2,
    selectedDemoObj.color1,
    selectedDemoObj.color3,
    selectedDemoObj.color4
  ];

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


  console.log('title', title)


  return (
    <div>
      <div
        className="border rounded dash_card"
        style={{
          width: '100%',
        }}
      >
        <div className="border-bottom p-3">
          <div className="h3" style={{ fontFamily: 'Georgia' }}>
            {title}
          </div>
      </div>
        <div className="dash_card_body border-bottom p-3">
          <div className="d-flex align-items-center">
 
            <div className="demo-container d-flex flex-nowrap"   style={{alignItems: "center",
    justifyContent: "center"}} ref={demoContainer}>
              {demos.map((demo, i) => (
                <div
                  key={demo.display}
                  onClick={() => {
                    onDemographicChange(demo.display);
                  }}
                  className={classnames('demo-pills', {
                    'active-pill': selectedDemo.display === demo.display,
                  })}
                >

<i className={demo.icon +" fas mr-2"}></i>
                  {demo.display}
                </div>
              ))}
            </div>
 
          </div>{' '}
          <TimeTrendChart
            data={data
              .filter(d => d.demo === selectedDemo.demo)}
            levels={selectedDemoLevels}
            colors={colors}
            title={title}
            demo={selectedDemo.display}
          />
        </div>
      </div>
    </div>
  );
}

 

export default TimeTrend;
