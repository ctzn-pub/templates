import React, { useState, useRef } from 'react';
import Left from '../../images/leftarrow.svg';
import Right from '../../images/rightarrow.svg';
import classnames from 'classnames';
import styled from 'styled-components';
import TimeTrendChart from './TimeTrendChart.jsx';

const Radiobutton = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

function TimeTrend({chartdata, alldata, defs} ) {
  const data = chartdata.map(d => Object.freeze(d));
  const demos = defs;
  const starting = demos.find(element => element.demo == 'racecl4');

  const units = ['mean', 'have', 'median'];
  const [selectedDemo, setSelectedDemo] = useState(starting);
  const [selectedUnit, setSelectedUnit] = useState(units[2]);
  const [selectedUnit2, setSelectedUnit2] = useState('raw');
  console.log('selectedUnit2', selectedUnit2);
  console.log('data', data);
  const [selectedDemoObj, setSelectedDemoObj] = useState(starting);
  const colors = [
    selectedDemoObj.color2,
    selectedDemoObj.color1,
    selectedDemoObj.color3,
    selectedDemoObj.color4,
    selectedDemoObj.color5,
    selectedDemoObj.color6,
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
            {alldata.title}
          </div>
          <form style={{ display: 'flex' }}>
            Data Type:
            <Radiobutton>
              <label>
                <input
                  style={{ 'margin-right': '5px' }}
                  type="radio"
                  value="median"
                  checked={selectedUnit2 == 'raw'}
                  onChange={v => setSelectedUnit2('raw')}
                />
                Raw
              </label>
            </Radiobutton>
            <Radiobutton>
              <label>
                <input
                  style={{ 'margin-right': '5px' }}
                  type="radio"
                  value="option2"
                  checked={selectedUnit2 == 'pdiff'}
                  onChange={v => setSelectedUnit2('pdiff')}
                />
                % Difference from 1989
              </label>
            </Radiobutton>
            {/* <Radiobutton>
              <label>
                <input
                  style={{ 'margin-right': '5px' }}
                  type="radio"
                  value="have"
                  checked={selectedUnit == 'have'}
                  onChange={v => setSelectedUnit('have')}
                />
                Percent Holding (%)
              </label>
            </Radiobutton> */}
          </form>

          <form style={{ display: 'flex' }}>
            Units:
            <Radiobutton>
              <label>
                <input
                  style={{ 'margin-right': '5px' }}
                  type="radio"
                  value="median"
                  checked={selectedUnit == 'median'}
                  onChange={v => setSelectedUnit('median')}
                />
                Median ($)
              </label>
            </Radiobutton>
            <Radiobutton>
              <label>
                <input
                  style={{ 'margin-right': '5px' }}
                  type="radio"
                  value="option2"
                  checked={selectedUnit == 'mean'}
                  onChange={v => setSelectedUnit('mean')}
                />
                Mean ($)
              </label>
            </Radiobutton>
            {/* <Radiobutton>
              <label>
                <input
                  style={{ 'margin-right': '5px' }}
                  type="radio"
                  value="have"
                  checked={selectedUnit == 'have'}
                  onChange={v => setSelectedUnit('have')}
                />
                Percent Holding (%)
              </label>
            </Radiobutton> */}
          </form>
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
          </div>{' '}
          <TimeTrendChart
            unit={selectedUnit}
            unit2={selectedUnit2}
            data={data
              .filter(d => d.demo === selectedDemo.demo)
              .filter(d => d.unit == selectedUnit)
              .filter(d => d.unit2 == selectedUnit2)}
            levels={selectedDemoLevels}
            colors={colors}
            title={alldata.title}
            demo={selectedDemo.display}
            //    yLabel={`${alldata.alldata.units} ${alldata.alldata.measure}`}
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
