import { useMutation } from '@apollo/client';

import { SIGN_UP } from '../graphql/mutations';
import useSignIn from './useSignIn';

const useSignUp = () => {
  const [signup, result] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    try {
      await signup({ variables: { username, password } });

      await signIn({ username, password });
    } catch (e) {
      console.log('E', e);
      throw e;
    }
  };

  return [signUp, result];
};

export default useSignUp;
