import React, { useState, useMemo, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Left from '../../../images/leftarrow.svg';
import Right from '../../../images/rightarrow.svg';
import classnames from 'classnames';
import MarginalEffectChart from './MarginalEffectChart';

function MarginalEffect({ variable, axislabel, setTechnicalNotesDemo, data }) {
  data = data.map(d => ({ ...d, displayname: d.demoByLabelsDemo.displayname }));

  const demos = useMemo(() => [...new Set(data.map(d => d.displayname))], [data]);
  return (
    <>
      <DesktopMarginalEffect data={data} demos={demos} axislabel={axislabel} variable={variable} />
      <MobileMarginalEffect
        data={data}
        demos={demos}
        variable={variable}
        axislabel={axislabel}
        setTechnicalNotesDemo={setTechnicalNotesDemo}
      />
    </>
  );
}

const DesktopMarginalEffect = ({ data, axislabel, demos, variable }) => {
  return (
    <div className="row d-none d-md-flex">
      {demos.map(demo => (
        <div className="col-4" key={demo}>
          <MarginalEffectChart
            data={data.filter(d => d.displayname === demo)}
            demo={demo}
            axislabel={axislabel}
            variable={variable}
          />
        </div>
      ))}
    </div>
  );
};
const MobileMarginalEffect = ({ data, demos, axislabel, variable, setTechnicalNotesDemo }) => {
  const demosDisplay = useMemo(() => [...new Set(data.map(a => a.displayname))], [data]);
  const demoContainer = useRef();

  const [selectedDemo, setSelectedDemo] = useState(demos[0]);

  const onDemographicChange = demo => {
    setSelectedDemo(demo);
    setTechnicalNotesDemo(demo);
  };

  return (
    <div className="d-block d-md-none">
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
      <MarginalEffectChart
        mobile
        data={data.filter(d => d.displayname === selectedDemo)}
        demo={selectedDemo}
        axislabel={axislabel}
        variable={variable}
      />
    </div>
  );
};
export default MarginalEffect;

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
