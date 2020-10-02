import React from 'react';
import { useStaticQuery, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import FrontCard from './common/FrontCard/';
import BgImage from './common/FrontCard/BgImage';

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

  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={data => (
        <div id="container">
          <h1 style={{ marginBottom: 40 }}>Our Contents</h1>
          <div>
            <Grid>
              {data.pages.edges.map(d => {
                const title = d.node.frontmatter.title;
                const path = d.node.fields.slug;
                const image = d.node.frontmatter.image;

                const img = data.images.edges.find(({ node }) => node.relativePath === image).node;
                console.log('img', img);

                return (
                  <FrontCard
                    title={title}
                    url={path}
                    image={img.childImageSharp.fluid}
                    key={title}
                    subtitle={title}
                  />
                );
              })}
            </Grid>
          </div>
        </div>
      )}
    />
  );
}

export default FrontPage;
