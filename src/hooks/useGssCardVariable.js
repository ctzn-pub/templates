import { useStaticQuery, graphql } from 'gatsby';
export const useGssCardVariable = () => {
  const { hasura2 } = useStaticQuery(
    graphql`
      query {
        hasura2 {
          regressions: gss_single_regressions(where: { var: { _eq: "happy" } }) {
            confhigh
            conflow
            predicted
            stderror
            var
            x
            demographic {
              group
              labels
              order
              sitewide_demographic
            }
          }
          variableimportance: gss_importance(where: { var: { _eq: "happy" } }) {
            percentage
            relative_importance
            scaled_importance
            type
            var
            demographic
            demo_metum {
              icon
              sitewide_demographic
            }
          }
          timetrend: gss_gss_timetrend(
            where: { variable: { _eq: "happy" } }
            order_by: { year: asc }
          ) {
            y: average
            color
            demographic
            demographiclevel
            demo_metum {
              icon
              sitewide_demographic
            }
            x: year
          }
        }
      }
    `
  );

  return hasura2;
};
