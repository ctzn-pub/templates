import { gql, useQuery } from '@apollo/client';

export const useGssVariable = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        question_bank(where: { source: { _eq: "gss" }, question_id: { _eq: $var } }) {
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
        meta2: gss_gss_counts(where: { variable: { _eq: $var } }) {
          min
          max
          obs
        }
        variableimportance: gss_importance(where: { var: { _eq: $var } }) {
          percentage
          relative_importance
          scaled_importance
          source
          type
          var
          demographic
          demographics_metum {
            icon
            sitewide_demographic
          }
        }
        timetrend: gss_gss_timetrend(where: { Variable: { _eq: $var } }, order_by: { Year: asc }) {
          y: Average
          Color
          Demographic
          DemographicLevel
          demographics_metum {
            icon
            sitewide_demographic
          }
          Overall
          x: Year
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    meta2: data.meta2[0],
    metadata: data.question_bank[0],
    timetrend: data.timetrend,
    variableimportance: data.variableimportance,
  };
};
