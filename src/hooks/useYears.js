import { useStaticQuery, graphql } from 'gatsby';
export const useYears = () => {
  const { hasura } = useStaticQuery(
    graphql`
      {
        hasura {
          electoral_history_yearly {
            Year
            D_EV_Total
            D_Nominee_prop
            D_Popular
            R_EV_Total
            R_Nominee_prop
            R_Popular
            dem_pic
            rep_pic
            turnout
            winning_party
          }
        }
      }
    `
  );

  return hasura.electoral_history_yearly;
};
