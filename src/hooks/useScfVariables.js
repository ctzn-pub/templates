import { useStaticQuery, graphql } from 'gatsby';
export const useAnesVariables = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          scf_temp_meta: question_bank(where: { data_source: { short_name: { _eq: "scf" } } }) {
            question_id
            title
          }
        }
      }
    `
  );

  return hasura.scf_temp_meta;
};
