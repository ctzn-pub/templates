import { gql, useQuery } from '@apollo/client';

export const useSingleVariable = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        question_bank(where: { source: { _eq: "vsg" }, question_id: { _eq: $var } }) {
          measure
          question_text
          scale_original
          data_source {
            long_name
          }
          transformation
          units
          title
        }
        frequency(where: { source: { _eq: "vsg" }, variable: { _eq: $var } }) {
          count
        }
        intdata: single_variable_interaction2(
          where: { source: { _eq: "vsg" }, variable: { _eq: $var } }
        ) {
          color_1
          color_2
          conf_high
          conf_low
          demo
          meta: level {
            demometum {
              display
            }
            order
            display
          }
          facet
          group
          labels
          predicted
          variable
          x
        }
        me: single_variable_main_effects(
          where: { source: { _eq: "vsg" }, variable: { _eq: $var } }
        ) {
          conf_high
          conf_low
          demo
          labels
          y: predicted
          demoByLabelsDemo {
            displayname
          }
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    metadata: data.question_bank[0],
    frequency: data.frequency,
    intdata: data.intdata,
    me: data.me,
  };
};
