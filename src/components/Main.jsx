import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import AppBar from './AppBar';
import CreateReview from './CreateReview';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e5e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/createReview'>
          <CreateReview />
        </Route>
        <Route path='/userReviews'>
          <UserReviews />
        </Route>
        <Route path='/repository/:id'>
          <SingleRepository />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;
