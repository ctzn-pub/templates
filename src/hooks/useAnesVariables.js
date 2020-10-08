import { useStaticQuery, graphql } from 'gatsby';
export const useAnesVariables = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          anes_temp_meta: question_bank(where: { data_source: { short_name: { _eq: "anes" } } }) {
            question_id
            title
          }
        }
      }
    `
  );

  return hasura.anes_temp_meta;
};
