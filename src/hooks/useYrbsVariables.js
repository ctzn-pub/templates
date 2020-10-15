import { useStaticQuery, graphql } from 'gatsby';
export const useYrbsVariables = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          yrbs_temp_meta {
            question_id
            title
            tags
          }
        }
      }
    `
  );

  return hasura.yrbs_temp_meta;
};
