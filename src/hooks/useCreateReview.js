import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const useCreateReview = () => {
  const [review, result] = useMutation(CREATE_REVIEW);
  let history = useHistory();

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      const { data } = await review({
        variables: {
          repositoryName,
          ownerName,
          rating: parseInt(rating),
          text,
        },
      });
      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log('E', e);
      throw e;
    }
  };

  return [createReview, result];
};

export default useCreateReview;
