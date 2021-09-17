import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  let history = useHistory();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push('/');
  };

  return [signOut];
};

export default useSignOut;
