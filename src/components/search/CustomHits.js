import { connectHits } from 'react-instantsearch-dom';
import React, { Component } from 'react';
import Hit from './../common/Hits';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  align-items: top;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(min-content, max-content);

  grid-gap: 20px;
  // grid-gap: 64px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-gap: 80px;
  }
`;

const Hits = ({ hits }) => (
  <Grid>
    {hits.map(hit => (
      <Hit hit={hit} />
    ))}
  </Grid>
);

export default connectHits(Hits);
