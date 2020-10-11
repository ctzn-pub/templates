import { gql, useQuery } from '@apollo/client';

export const useEssVariable = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        question_bank(where: { source: { _eq: "ess" }, question_id: { _eq: $var } }) {
          measure
          question_text
          scale_original
          data_source {
            long_name
            short_name
            time_period
            geo
            sample_size_rows
          }
          transformation
          units
          title
        }
        meta2: europe_all_levels_final(distinct_on: obs) {
          obs
        }
        summary_barchart: europe_all_levels_final(where: { var: { _eq: $var } }) {
          color
          level
          level_count
          order
        }
        varimp2: europe_varimp(where: { variable: { _eq: $var } }) {
          my_ranks

          demo: demographic
          demographics_metum {
            sitewide_demographic
            icon
          }
        }
        demos: europe_demographics_byc(
          where: {
            cntry: { _is_null: false }
            var: { _eq: $var }
            demographicByDemographicLevelSource: { show: { _eq: 1 } }
          }
        ) {
          country_metadatum {
            name: cntry
            iso2
          }
          y: value

          demographic
          demographics_metum {
            icon
            sitewide_demographic
          }
          level
          dlevel: demographicByDemographicLevelSource {
            color
          }
        }
        overall: europe_ess_overall(
          where: { cntry: { _is_null: false }, var: { _eq: $var } }
          order_by: [{ per: desc }]
        ) {
          country_metadatum {
            name: cntry
            iso2
            cntry
          }
          y: per
          var
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    meta2: data.meta2[0],
    overall: data.overall,
    demos: data.demos,
    varimp2: data.varimp2,
    summary_barchart: data.summary_barchart,
    metadata: data.question_bank[0],
  };
};
