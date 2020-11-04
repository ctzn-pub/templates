import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import DropdownRefinementList from './DropdownRefinementList';
import CustomHits from './CustomHits.js';
import RefinementListSearch from './RefinementListSearch';
import { orderBy } from 'lodash';
import './Dropdown.css';
import Hit from './../common/Hits';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  Stats,
  ClearRefinements,
  RefinementList,
  Configure,
  CurrentRefinements,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

export default function GalSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName="Gallery">
      <SearchBox />
      <Stats />

      <CurrentRefinements />
      {/* <CustomCurrentRefinement /> */}
      <Row>
        <DropdownRefinementList
          transformItems={items => orderBy(items, 'label', 'asc')}
          header="Geography"
          attribute="geo"
        />

        <DropdownRefinementList
          transformItems={items => orderBy(items, 'label', 'asc')}
          attribute="source.long_name"
          header="Data Source"
        />

        <DropdownRefinementList attribute="tags" header="Tags" searchable={true} showMore={true} />
      </Row>

      {/* <Hits hitComponent={Hit} /> */}
      <ClearRefinements />

      <CustomHits />

      <Pagination />
    </InstantSearch>
  );
}
