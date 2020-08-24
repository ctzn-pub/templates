import { useStaticQuery, graphql } from 'gatsby';
export const useVariables = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          gallerygraphs_metadata {
            topic
            tag1
            tag2
            shortname
            data_source {
              long_name
            }
            source
            var
          }
        }
      }
    `
  );

  return hasura.gallerygraphs_metadata;
};
