import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  tabItem: {
    marginRight: 10,
  },
  textColor: {
    color: 'white',
  },
});

const TabItem = ({ props }) => {
  if (props.link) {
    return (
      <TouchableOpacity style={styles.tabItem}>
        <Link to={props.link}>
          <Text fontWeight='bold' fontSize='heading' color='textSecondary'>
            {props.label}
          </Text>
        </Link>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.tabItem} onPress={props.onPress}>
        <Text fontWeight='bold' fontSize='heading' color='textSecondary'>
          {props.label}
        </Text>
      </TouchableOpacity>
    );
  }
};

const AppBar = () => {
  const [signOut] = useSignOut();
  const authStorage = useAuthStorage();
  const accessToken = authStorage.getAccessToken();

  let authorizedUser = null;

  if (accessToken) {
    const { data } = useQuery(GET_AUTHORIZED_USER, {
      fetchPolicy: 'cache-and-network',
    });

    if (data) {
      data.authorizedUser !== null
        ? (authorizedUser = data.authorizedUser)
        : (authorizedUser = null);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TabItem props={{ label: 'Repositories', link: '/repositories' }} />
        {authorizedUser ? (
          <>
            <TabItem
              props={{ label: 'Create a Review', link: '/createReview' }}
            />
            <TabItem props={{ label: 'My Reviews', link: '/userReviews' }} />
            <TabItem props={{ label: 'Sign Out', onPress: signOut }} />
          </>
        ) : (
          <>
            <TabItem props={{ label: 'Sign In', link: '/signin' }} />
            <TabItem props={{ label: 'Sign Up', link: '/signup' }} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
