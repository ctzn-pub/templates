import React, { useState, useMemo, useRef, useEffect } from "react"
import Chart from "./TimeTrendChart"
import classnames from "classnames"
import Left from '../../../images/leftarrow.svg';
import Right from '../../../images/rightarrow.svg';


function TimeTrend({
  data,
  variables,
  axislabel,
  shortname,
  variable,
  defaultDemo,
}) {

  
  data = data.map(d => Object.freeze(d))
console.log("defaultDemo", defaultDemo)

  variables = variables.sort(
    (a, b) => b.percentage - a.percentage
  )

  variables.forEach(
    (object, i) => (object.my_ranks = variables.length - i)
  )



  const demographies = useMemo(
    () =>
      variables.filter(
        d =>
          d.demo_metum.sitewide_demographic !== "Year" &&
          d.demo_metum.sitewide_demographic !== "Census Region"
      ),
    [variables]
  )
  const [selectedDemographe, setSelectedDemographe] = useState(null)

  const [chartData, setChartData] = useState(
    calcChartData(data, selectedDemographe, axislabel, shortname)
  )

  const demoContainer = useRef()
  const onDemographicChange = demo => {
    setSelectedDemographe(demo)
    setChartData(calcChartData(data, demo, axislabel, shortname))
  }

  useEffect(() => {
    if (defaultDemo) {
      const defaultDemoObj = demographies.find(
        d => d.demographic.toLowerCase() === defaultDemo?.toLowerCase()
      )
      setSelectedDemographe(defaultDemoObj)
      setChartData(calcChartData(data, defaultDemoObj, axislabel, shortname))
    } else {
      setSelectedDemographe(demographies[0])
      setChartData(calcChartData(data, demographies[0], axislabel, shortname))
    }
  }, [defaultDemo, demographies])

  if (!selectedDemographe || !chartData) {
    return null
  }

console.log('chartData', chartData)

  return (

      <div className="mb-2 modalouter">
        <div className="d-flex align-items-center">
          <div
            onClick={() => {
              sideScroll("left", 25, 200, 10, demoContainer)
            }}
            style={{
              cursor: "pointer",
            }}
          >
 
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
            {demographies.map((demo, i) => {

              return (
                <div
                  key={demo.demographic}
                  onClick={() => {
                    onDemographicChange(demo)
                  }}
                  className={classnames("demo-pills", {
                    "active-pill":
                      selectedDemographe.demographic === demo.demographic,
                  })}
                >
                  <i className={demo.demo_metum.icon + " fas mr-2"}></i>
                  {demo.demo_metum.sitewide_demographic}
                </div>
              )
            })}
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
        {data ? <Chart {...chartData} isBinary={'isBinary'} /> : null}
      </div>

  )
}
export default TimeTrend

const calcChartData = (data, selectedDemographe, axislabel, shortname) => {
  if (!selectedDemographe) return null
  let newData = data.filter(d => {
    return (
      d.demo_metum.sitewide_demographic ===
      selectedDemographe.demo_metum.sitewide_demographic
    )
  })

  let demographiclevel = []
  newData.forEach(d => {
    if (!demographiclevel.includes(d.demographiclevel))
      demographiclevel.push(d.demographiclevel)
  })

  demographiclevel = demographiclevel.map(level => ({
    title: level,
    color: newData.find(d => d.demographiclevel === level).color,
  }))

  let series = demographiclevel.map(level => ({
    name: level.title,
    color: newData.find(d => d.demographiclevel === level.title).color,
    type: "line",
    data: newData.filter(d => d.demographiclevel === level.title),
  }))
  const cut = selectedDemographe.demo_metum.sitewide_demographic
  const question = "question"
  const x_label = "x_label"
  const y_label = axislabel

  return {
    series,
    cut,
    title: question,
    shortname,
    x_label,
    y_label,
  }
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
