import { gql, useQuery } from '@apollo/client';

export const useCountyElectionData = variable => {
  //   if (!variable) return null;
  const { loading, error, data } = useQuery(
    gql`
      query($var: float8) {
        electoral_history_state(where: { year: { _eq: $var } }) {
          FIPS
          color
          year
        }
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
  // console.log(error);
  // if (loading || error) return null;
  return {
    loading,
    error,
    data: {
      counties: data?.electoral_history_yearly[0].counties,
      states: data?.electoral_history_state,
    },
  };
};
