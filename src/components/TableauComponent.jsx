import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

function TableauComponent() {
  return (
    <div>
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
    </div>
  );
}

export default TableauComponent;
