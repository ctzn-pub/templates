import { useStaticQuery, graphql } from 'gatsby';
export const useEssCorrVariable = () => {
  const { hasura2 } = useStaticQuery(
    graphql`
      query {
        hasura2 {
          defs: ess_country_meta_defs {
            Source
            display_name
            short_name
          }

          corr: ess_correlations(where: { var: { _eq: "happy" } }) {
            r
            y
          }
          fits: ess_corrfits(where: { var: { _eq: "happy" } }) {
            x: ax
            y: fitted
            cat
            high
            low
          }
        }
      }
    `
  );

  return hasura2;
};
