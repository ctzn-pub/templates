import React, { useState, useRef } from 'react';
import InteractionsChart from './InteractionsChart';
import Left from '../../../images/leftarrow.svg';
import Right from '../../../images/rightarrow.svg';
import classnames from 'classnames';
import { useMemo } from 'react';
function Interactions({ setTechnicalNotesDemo, intdata, axislabel }) {
  const data = intdata.map(d => ({ ...d, displayname: d.demoByLabelsDemo.displayname }));
  const demos = useMemo(() => [...new Set(data.map(d => d.displayname))], [data]);
  const demosDisplay = useMemo(() => [...new Set(data.map(a => a.displayname))], [data]);
  const demoContainer = useRef();

  const [selectedDemo, setSelectedDemo] = useState(demos[1]);
  // const [selectedDemofacets, setSelectedDemofacets] = useState([
  //   ...new Set(data.filter(d => d.demo === selectedDemo).map(d => d.facet)),
  // ]);

 const [selectedDemofacets, setSelectedDemofacets] = useState(["white", "nonwhite"]);


  console.log('selectedDemofacets',selectedDemofacets )

 
  const onDemographicChange = demo => {
    setSelectedDemofacets([...new Set(data.filter(d => d.displayname === demo).map(d => d.facet))]);
    setSelectedDemo(demo);
    setTechnicalNotesDemo(demo);
  };

  return (
    <div>
      <div className="lead ">Interaction of Politics & {selectedDemo}</div>
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
      <div className="row">
        {selectedDemofacets.map(facet => (
          <div className="col-12 col-md-6">
            <InteractionsChart
              data={data.filter(a => a.displayname === selectedDemo && a.facet === facet)}
              facet={facet}
              //  colors={colors}
              axislabel={axislabel}
              demo={selectedDemo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Interactions;

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
