import React, { useState, useEffect } from "react"
import Effects from "./EffectChart"
import effectsIcon from "./../../../images/effects.svg"
import classnames from "classnames"
import { FaShareAlt } from "react-icons/fa"

function Effect({
  data,
  axislabel,
  source,
  isBinary,
  page_title,
  variables,
  shortname,
  showMap = false,

  subGraphId,
}) {
  let groupSet = new Set(data.map(d => d.demographic.group))
  let vs = []
 
    vs = variables.map(v => v.demographic)
    vs = vs.filter(item => item !== "year")
    vs = vs.filter(item => item !== "Census_Region")
    vs.push("Census_Region", "Decade")
   
  const groups = vs.filter(v => groupSet.has(v)).slice(0,3)
  const ranklength = variables.map(i => i.my_ranks)

  var per40 = Math.floor(ranklength.length * 0.6 + 1)
  var per30 = Math.floor(ranklength.length * 0.3 + 1)

  const summaryinfo = variables.map(item => ({
    demographic: item.demographic ,
    mrank: item.my_ranks,
    rank:
      item.my_ranks > per40
        ? " most "
        : item.my_ranks <= per30
        ? " least "
        : " middle ",
  }))
  const filterSummary = (d, node) => {
    return d.demographic === node
  }

  const filterData = (d, node) => {
    return d.demographic.group === node
  }
  const mapData = data
    .filter(d => d.demographic.group === "cntry")
    .map(d => ({ ...d, name: d.demographic.labels, value: d.predicted }))

  const isSubGraph = !!groups.find(
    n => n.toLowerCase() === subGraphId?.toLowerCase()
  )



   return (

        <div
          className="quote"
          style={{
            height: "582px",
            fontSize: "22px",
            textAlign: "center",
            marginLeft: "8%",
          }}
        >
          <div
            style={{
              fontSize: "18px",
            }}
          >
            Probability({shortname}={axislabel})
          </div>{" "}

        <div
          className={classnames("row", {
            "d-flex justify-content-center": isSubGraph,
          })}
        >
          {groups
            .filter(n =>
              subGraphId ? subGraphId.toLowerCase() === n.toLowerCase() : true
            )
            .map(node =>
         (
              
                <div
                  key={node}
                  className={classnames("my-3 col-md-4 col-12 eff")}
                >
                  <Effects
                    isBinary={isBinary}
                    shortname={page_title }
                    source={source}
                    title={data.filter(d => filterData(d, node))[1].demographic
                            .sitewide_demographic

                    }
                    axis={axislabel}
                    suminfo={summaryinfo.filter(d => filterSummary(d, node))}
                    data={data.filter(d => filterData(d, node))}
                    id={node}
                  />

         </div>
              )
            )}
        </div>
 
</div>
  )
}

export default Effect