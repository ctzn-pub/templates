import { useStaticQuery, graphql } from 'gatsby';
export const useAnesVariables = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          anes_temp_meta {
            question_id
            title
          }
        }
      }
    `
  );

  return hasura.anes_temp_meta;
};
