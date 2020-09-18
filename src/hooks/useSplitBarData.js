import { useStaticQuery, graphql } from 'gatsby';
export const useSplitData = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          cards(
            where: {
              qb_card_bridges: { source: { _eq: "vsg" }, question_id: { _eq: "news_sources" } }
            }
          ) {
            template_type
            title
            cards_tags {
              tag {
                id
                tag_value
              }
            }
          }
          question_bank(where: { source: { _eq: "vsg" }, question_id: { _eq: "news_sources" } }) {
            measure
            question_text
            scale_original
            data_source {
              long_name
            }
            transformation
            units
          }
          split_bar_data(where: { source: { _eq: "vsg" }, variable: { _eq: "news_sources" } }) {
            avg
            combo_lab
            demo
            key
            level
            source
            variable
          }

          split_bar_overall_data(
            where: { source: { _eq: "vsg" }, variable: { _eq: "news_sources" } }
          ) {
            avg
            key
            variable
            combo_lab
          }
        }
      }
    `
  );

  return {
    data: hasura.split_bar_data,
    card: hasura.cards[0],
    metadata: hasura.question_bank[0],
    overall: hasura.split_bar_overall_data,
  };
};
