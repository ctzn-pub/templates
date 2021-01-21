import { useStaticQuery, graphql } from 'gatsby';
export const useEssCardVariable = () => {
  const { hasura2 } = useStaticQuery(
    graphql`
      query {
        hasura2 {
          regressions: ess_single_regressions(where: { var: { _eq: "happy" } }) {
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
              demographics_metum {
                sitewide_demographic
                icon
              }
            }
          }
          varimp2: ess_varimp(where: { variable: { _eq: "happy" } }) {
            my_ranks
            demo: demographic
            demographics_metum {
              sitewide_demographic
              icon
            }
          }
          demos: ess_demographics_byc(
            where: {
              cntry: { _is_null: false }
              var: { _eq: "happy" }
              demographicByLevelDemographic: { show: { _eq: 1 } }
            }
          ) {
            country_metadatum {
              name: cntry
              iso2
            }
            y: value
            var
            demographic
            demographics_metum {
              icon
              sitewide_demographic
            }
            level
            dlevel: demographicByLevelDemographic {
              color
            }
          }

          overall: ess_ess_overall(
            where: { cntry: { _is_null: false }, var: { _eq: "happy" } }
            order_by: [{ per: desc }]
          ) {
            country_metadatum {
              name: cntry
              iso2
              cntry
              religion
              religionByReligion {
                color
              }
              hdi
              gdp
              education
              gender_inequality
              gini
              inequality_LE
              pdi
              idv
              mas
              ethnic
              religious
              linguistic
              z: population
              education
            }
            y: per
          }
        }
      }
    `
  );

  return hasura2;
};
