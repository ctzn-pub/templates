import { gql, useQuery } from '@apollo/client';

export const useTimeTrendDemo = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        meta: question_bank(where: { question_id: { _eq: $var }, source: { _eq: "scf" } }) {
          question_text
          title
        }
        chartdata: scf_scf1(where: { question_id: { _eq: $var } }) {
          avg
          demo
          level
          year
          unit
          unit2
        }
        demos: scf_demodefs(order_by: { order: desc }) {
          order
          display
          color2
          color1
          color3
          color6
          color4
          color5
          demo: variable
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    alldata: data.meta[0],
    chartdata: data.chartdata,
    defs: data.demos,
  };
};
