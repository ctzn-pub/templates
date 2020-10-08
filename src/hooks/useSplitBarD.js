import { gql, useQuery } from '@apollo/client';

export const useSplitBarD = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: String) {
        cards(where: { qb_card_bridges: { source: { _eq: "vsg" }, question_id: { _eq: $var } } }) {
          template_type
          title
          cards_tags {
            tag {
              id
              tag_value
            }
          }
        }
        question_bank(where: { source: { _eq: "vsg" }, question_id: { _eq: $var } }) {
          measure
          question_text
          scale_original
          data_source {
            long_name
          }
          transformation
          units
        }
        split_bar_data(where: { source: { _eq: "vsg" }, variable: { _eq: $var } }) {
          avg
          combo_lab
          demo
          key
          level
          source
          variable
        }

        split_bar_overall_data(where: { source: { _eq: "vsg" }, variable: { _eq: $var } }) {
          avg
          key
          variable
          combo_lab
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    data: data.split_bar_data,
    card: data.cards[0],
    metadata: data.question_bank[0],
    overall: data.split_bar_overall_data,
  };
};
