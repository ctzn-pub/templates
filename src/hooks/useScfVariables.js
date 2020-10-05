import { useStaticQuery, graphql } from 'gatsby';
export const useAnesVariables = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          scf_temp_meta {
            question_id
            title
          }
        }
      }
    `
  );

  return hasura.scf_temp_meta;
};
