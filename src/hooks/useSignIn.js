import { useMutation, useApolloClient } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useHistory } from 'react-router-native';

const useSignIn = () => {
  const [login, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  let history = useHistory();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await login({ variables: { username, password } });
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
      history.push('/');
    } catch (e) {
      console.log('E', e);
      throw e;
    }
  };

  return [signIn, result];
};

export default useSignIn;
