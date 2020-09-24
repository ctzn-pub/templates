import React from 'react';
import LazyLoad from 'react-lazyload';
import Tableau from './Tableau.png';

function TableauComponent() {
  return (
    <div>
      <LazyLoad height={800} placeholder={<img src={Tableau} />}>
        <iframe
          src="https://public.tableau.com/views/State_election_history/Dashboard3?:display_count=no&amp;:showVizHome=no#22"
          scrolling="no"
          style={{
            borderStyle: 'none',
            overflow: 'hidden',
            display: 'block',
            margin: 'auto',
            width: '1200px',
            height: '800px',
          }}
        ></iframe>
      </LazyLoad>{' '}
    </div>
  );
}

export default TableauComponent;
