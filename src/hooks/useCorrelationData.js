import { gql, useQuery } from '@apollo/client';

export const useCorrelationData = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        gallerygraphs_country_meta_defs {
          Source
          display_name
          short_name
        }
        gallerygraphs_ess_metadata(where: { variable: { _eq: $var } }) {
          variable
          corr: correlations {
            r
            y
          }
          fits: corrfits {
            x: ax
            y: fitted
            cat
            high
            low
          }
          metadata: ess_metadatum {
            axislabel
          }
          overall: ess_overalls(where: { cntry: { _is_null: false } }, order_by: [{ per: desc }]) {
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
            var
          }
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    data: data.gallerygraphs_ess_metadata[0],
    gallerygraphs_country_meta_defs: data.gallerygraphs_country_meta_defs,
  };
};
