import React, { useState, useEffect } from 'react';
var Fred = require('fred-api');

function FredPage() {
  const fred = new Fred(process.env.GATSBY_FRED_KEY);

  const [starsCount, setStarsCount] = useState(0);
  useEffect(() => {
    fred
      .getSeries({ series_id: 'GNPCA' })
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setStarsCount(resultData.stargazers_count);
      }); // set data for the number of stars
  }, []);
  console.log('starsCount', starsCount);
  return (
    <div>
      <h1>Economic Time Series Data</h1>
    </div>
  );
}

export default FredPage;
