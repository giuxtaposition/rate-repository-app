import React from 'react';
import { StyleSheet, Pressable, ScrollView, View } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

import Text from './Text';

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
});

const TabItem = ({ label, link }) => {
  return (
    <Pressable style={styles.tabItem}>
      <Link to={link}>
        <Text fontWeight='bold' fontSize='heading' color='textSecondary'>
          {label}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container} horizontal>
        <TabItem label='Repositories' link='/repositories' />
        <TabItem label='Sign In' link='/signin' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
