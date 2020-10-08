// import { useStaticQuery, graphql } from 'gatsby';
// export const useTimeTrendDemo = () => {
//   const { hasura } = useStaticQuery(
//     graphql`
//       query {
//         hasura {
//           meta: anes_temp_meta(where: { question_id: { _eq: "VCF0310" } }) {
//             question_text
//             title
//             source
//             units
//             measure
//             chartdata: rdf1s {
//               avg
//               demo
//               level
//               year
//             }
//           }
//           demos: anes_demodefs {
//             display
//             demo: variable
//           }
//         }
//       }
//     `
//   );

//   return {
//     alldata: hasura.meta[0],
//     defs: hasura.demos,
//   };
// };

import { gql, useQuery } from '@apollo/client';

export const useTimeTrendDemo = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        meta: question_bank(where: { question_id: { _eq: $var }, source: { _eq: "anes" } }) {
          question_text
          title
          source
          units
          measure
        }

        chartdata: anes_rdf1(where: { question_id: { _eq: $var } }) {
          avg
          demo
          level

          count
          year
        }

        demos: anes_demodefs {
          display
          color2: color1
          color1: color2
          demo: variable
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    meta: data.meta[0],
    chartdata: data.chartdata,
    demos: data.demos,
  };
};
