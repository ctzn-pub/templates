import { gql, useQuery } from '@apollo/client';

export const useTimeTrendDemo = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        yrbs_temp_meta(where: { question_id: { _eq: $var } }) {
          title
          chartdata: rdfs(where: { question_id: { _eq: $var } }) {
            avg
            demo
            level
            year
          }
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
    title: data.yrbs_temp_meta[0].title,
    chartdata: data.yrbs_temp_meta[0].chartdata,
    defs: data.demos,
  };
};
