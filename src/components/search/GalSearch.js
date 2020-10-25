import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
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
      <Row>
        <Col>
          <CurrentRefinements />
          <ClearRefinements />

          <h2>Geography:</h2>
          <RefinementList attribute="geo" />
          <h2>Data Source</h2>
          <RefinementList attribute="source" />
        </Col>
        <Col>
          <h3> Tags </h3>
          <RefinementList attribute="tags" searchable={true} showMore={true} />
        </Col>
      </Row>

      <Hits hitComponent={Hit} />
      <Pagination />
    </InstantSearch>
  );
}
