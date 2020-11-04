import React, { useState } from 'react';
import { useStaticQuery, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import FrontCard from './common/FrontCard/';
import BgImage from './common/FrontCard/BgImage';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link } from 'gatsby-plugin-modal-routing'

const animatedComponents = makeAnimated();

function FrontPage() {
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

  const SingleCard = styled.div`
    width: 400px;
    height: 400px;
  `;

  const data = useStaticQuery(graphql`
    query {
      pages: allMdx(filter: { frontmatter: { show: { eq: "yes" } } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
              tags
              image
              slug
              subtitle
            }
          }
        }
      }
      images: allFile(filter: { sourceInstanceName: { eq: "preview" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const bags = data.pages.edges
    .map(d => {
      return d.node.frontmatter.tags;
    })
    .flat(2);
  console.log('tags', data.pages.edges);
  const distinctbags = [...new Set(bags)];
  const tags = distinctbags.map(item => {
    return {
      value: item,
      label: item,
    };
  });

  const [selectedVariable, setSelectedVariable] = useState(null);

  function containsAny(source, target) {
    var result = source.filter(function(item) {
      return target.indexOf(item) > -1;
    });
    return result.length > 0;
  }

  let cards;

  cards = selectedVariable
    ? data.pages.edges.filter(egg =>
        containsAny(
          egg.node.frontmatter.tags,
          selectedVariable.map(d => d.value)
        )
      )
    : data.pages.edges;

  return (
    <div id="container">

      <h1 style={{ marginBottom: 40 }}>Our Contents</h1>
      For a full search, visit <Link to="/search"> Search </Link>
      <Select
        closeMenuOnSelect={false}
         components={animatedComponents}
        defaultValue={[]}
        isMulti
        value={selectedVariable}
        onChange={v => setSelectedVariable(v)}
        options={tags}
      />
      <div>
        <Grid>
          {cards.map(d => {
            const title = d.node.frontmatter.title;
            const path = d.node.fields.slug;
            const image = d.node.frontmatter.image;
            const tags = d.node.frontmatter.tags;

            const img = data.images.edges.find(({ node }) => node.relativePath === image).node;

            return (
              <FrontCard
                title={title}
                url={path}
                tags={tags}
                image={img.childImageSharp.fluid}
                key={title}
                subtitle={title}
              />
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default FrontPage;
