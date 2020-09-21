import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

function FrontPage() {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const posts = data.allMdx.edges.map(d => ({
    title: d.node.frontmatter.title,
  }));

  return (
    <div>
      <h1>Hello! </h1>
    </div>
  );
}

export default FrontPage;
