import { useQuery } from '@apollo/client';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = variables => {
  const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables,
  });

  return {
    reviews: data?.authorizedUser?.reviews,
    loading,
    refetch,
  };
};

export default useUserReviews;
