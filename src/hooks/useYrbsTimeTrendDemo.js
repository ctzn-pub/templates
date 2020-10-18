import { gql, useQuery } from '@apollo/client';

export const useTimeTrendDemo = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        chartdata: yrbs_rdf(where: { question_id: { _eq: $var } }) {
          avg
          demo
          level
          year
        }
        overall: yrbs_overall_time(where: { question_id: { _eq: $var } }) {
          avg
          count
          year
        }
        facet: yrbs_facet(where: { key: { _eq: $var } }) {
          avg
          grade
          count
          key
          race4
          sex
        }
        yrbs_temp_meta(where: { question_id: { _eq: $var } }) {
          title
          count
          units
          measure
        }
        demos: yrbs_demodefs {
          display
          color2
          color1
          color3
          color4
          icon
          demo: variable
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    meta: data.yrbs_temp_meta[0],
    facet: data.facet,
    chartdata: data.chartdata,
    overall: data.overall,
    defs: data.demos,
  };
};
