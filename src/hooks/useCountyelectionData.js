import { gql, useQuery } from '@apollo/client';

export const useCountyelectionData = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: float8) {
        electoral_history_yearly(where: { Year: { _eq: $var } }) {
          counties {
            color4
            id
            Per_Dem
            Per_Rep
          }
        }
      }
    `,
    { variables: { var: variable } }
  );
  if (loading || error) return null;
  return {
    data: data.electoral_history_yearly[0],
  };
};
