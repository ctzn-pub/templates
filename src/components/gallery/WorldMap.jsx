import React from 'react';
import loadable from '@loadable/component';

const Map = loadable(() => import('./WorldMapGraph'));

function WorldMap() {
  return <Map />;
}

export default WorldMap;
