const timeTrendTemplate = require('./templates/timeTrendTemplate');
const fs = require('fs');
const variables = require('./variables');

variables.forEach(variable => {
  fs.writeFileSync(
    `./notebooks/${variable}-timetrend.ipynb`,
    JSON.stringify(timeTrendTemplate(variable), null, 4)
  );
});

console.log('done');
