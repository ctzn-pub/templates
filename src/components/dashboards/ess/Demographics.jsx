import React, { useState, useRef, useEffect, useMemo } from "react"
import DemoChart from "./DemoChart"
import classnames from "classnames"
import Left from '../../images/leftarrow.svg';
import Right from '../../images/rightarrow.svg';

function Demographics({
  overall,
  demos,
  varimp2,
  shortname,
  axislabel,
  source,
  units,
  defaultDemo,
}) {
  const variables = [...varimp2].sort(
    (a, b) => b.my_ranks - a.my_ranks
  )

let isBinary = false
if (units === '%'){
  isBinary = true
}

  const ranks = useMemo(
    () =>
      variables.filter(
        d =>
          d.demographics_metum.sitewide_demographic !== "Year" &&
          d.demographics_metum.sitewide_demographic !== "Country" &&
          d.demographics_metum
      ),
    []
  )
  const pray = {
    my_ranks: 0,
    demographics_metum: {
      sitewide_demographic: "Prayer",
      icon: "fas fa-pray ",
    },
  }

  if (source == "ess") {
    ranks.push(pray)
  }

  const demoContainer = useRef()
  const [selectedDemo, setSelectedDemo] = useState(null)

  const [selectedDemoLevels, setSelectedDemoLevels] = useState(null)

  useEffect(() => {
    if (defaultDemo) {
      const defaultDemoObj = ranks.find(
        d => d.demo.toLowerCase() === defaultDemo?.toLowerCase()
      )
      setSelectedDemo(defaultDemoObj)
      setSelectedDemoLevels([
        ...new Set(
          demos
            .filter(
              d =>
                d.demographics_metum.sitewide_demographic ===
                defaultDemoObj.demographics_metum.sitewide_demographic
            )
            .map(d => d.level)
        ),
      ])
    } else {
      setSelectedDemo(ranks[0])
      setSelectedDemoLevels([
        ...new Set(
          demos
            .filter(
              d =>
                d.demographics_metum.sitewide_demographic ===
                ranks[0].demographics_metum.sitewide_demographic
            )
            .map(d => d.level)
        ),
      ])
    }
  }, [defaultDemo, ranks, demos])

  const onDemographicChange = demo => {
    setSelectedDemoLevels([
      ...new Set(
        demos
          .filter(
            d =>
              d.demographics_metum.sitewide_demographic ===
              demo.demographics_metum.sitewide_demographic
          )
          .map(d => d.level)
      ),
    ])

    setSelectedDemo(demo)
  }

  if (!selectedDemo || !selectedDemoLevels) {
    return null
  }

  return (
    <div
      className="container flex-column my-4"
      style={{ height: "100%" }}
      id="trend"
    >

        <div className="d-flex align-items-center">
          <div
            onClick={() => {
              sideScroll("left", 25, 200, 10, demoContainer)
            }}
            style={{
              cursor: "pointer",
            }}
          >
            {/* <img src={left} alt="" /> */}
            <Left
              style={{
                height: "20px",
                width: "20px",
              }}
            />
          </div>
          <div
            className="demo-container d-flex flex-nowrap mx-1"
            ref={demoContainer}
          >
            {ranks.map((demo, i) => (
              <div
                key={demo.demographics_metum.sitewide_demographic}
                onClick={() => {
                  onDemographicChange(demo)
                }}
                className={classnames("demo-pills", {
                  "active-pill":
                    selectedDemo?.demographics_metum?.sitewide_demographic ===
                    demo.demographics_metum.sitewide_demographic,
                })}
              >
                <i className={demo.demographics_metum.icon + " fas mr-2"}></i>
                {demo.demographics_metum.sitewide_demographic}
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              sideScroll("right", 25, 200, 10, demoContainer)
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <Right
              style={{
                height: "20px",
                width: "20px",
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
          key={selectedDemo.demographics_metum.sitewide_demographic}
          levels={selectedDemoLevels}
        />

    </div>
  )
}

function sideScroll(direction, speed, distance, step, demoContainer) {
  let scrollAmount = 0
  var slideTimer = setInterval(function() {
    if (direction == "left") {
      demoContainer.current.scrollLeft -= step
    } else {
      demoContainer.current.scrollLeft += step
    }
    scrollAmount += step
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer)
    }
  }, speed)
}

export default Demographics
