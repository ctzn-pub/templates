import React, { Component } from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

const RefinementListSearch = ({ items, refine, searchForItems }) => (
  <ul>
    <li>
      <input type="search" onChange={event => searchForItems(event.currentTarget.value)} />
    </li>
    {items.map(item => (
      <li key={item.label}>
        <a
          href="#"
          style={{ fontWeight: item.isRefined ? 'bold' : '' }}
          onClick={event => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          {item.label} ({item.count})
        </a>
      </li>
    ))}
  </ul>
);

export default connectRefinementList(RefinementListSearch);
