import { useStaticQuery, graphql } from 'gatsby';
export const useSplitBarDemo = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          split_bar_demo {
            color1
            color2
            demo
            displayname
            keep
            level
          }
        }
      }
    `
  );

  return hasura.split_bar_demo;
};
