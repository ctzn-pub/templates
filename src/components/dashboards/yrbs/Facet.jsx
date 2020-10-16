import React, { useState, useRef } from 'react';
import FacetChart from './FacetChart.jsx';



function Facet({facet, axis} ) {
console.log('axis', axis)
const ftitle = [...new Set(facet.map(a => a.race4))];
const maxval = Math.max.apply(Math, facet.map(function(o) { return o.avg; }))
console.log('maxval', maxval)

  return (
<div>


<div style={{display: "flex"}}>


<table>
<th>Sex</th>
<tr> <span style={{color: "#8700f8"}}>&#9673;  </span>Female</tr>
<tr><span style={{color: "#00c4aa"}}>&#9673;  </span> Male</tr>
</table>

<div style={{display: "flex", height: "600px",

//margin:"auto",
 width: "80%"}}>
        {ftitle.map(ftitle => (
          <div style={{'flex': '0 0 33.333333%',
            maxWidth: '33.333333%'}}>
            <FacetChart
            axis={axis}
              facet={facet.filter(a => a.race4 == ftitle)}
              ftitle={ftitle}
              max={maxval*100}
            />
</div>
        ))}    

    </div>

    </div>


    <div style = {{textAlign: "center", fontSize: "12px"}}> Grade</div>
    </div>
  );
}

 

export default Facet;
