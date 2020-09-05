import { useStaticQuery, graphql } from 'gatsby';
export const usePopulation = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          county {
            id
            Population
          }
        }
      }
    `
  );

  return hasura.county;
};
