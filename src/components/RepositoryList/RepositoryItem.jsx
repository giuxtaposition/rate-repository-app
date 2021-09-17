import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Button,
  Linking,
  Pressable,
} from 'react-native';
import { useHistory } from 'react-router-native';

import theme from '../../theme';
import { roundNumberToK } from '../../utils/roundNumberToK';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    backgroundColor: 'white',
  },
  generalInfoContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  detailsText: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  detailsTextItem: {
    padding: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  statsItemLabel: {
    textAlign: 'center',
  },
  statsItemData: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  languageText: {
    padding: 3,
    backgroundColor: theme.colors.purple,
    alignSelf: 'flex-start',
    marginBottom: 1,
    marginTop: 1,
    borderRadius: 5,
  },
});

const StatsItem = ({ data, label, testID }) => {
  return (
    <View>
      <Text style={styles.statsItemData} testID={testID}>
        {roundNumberToK(data)}
      </Text>
      <Text style={styles.statsItemLabel}>{label}</Text>
    </View>
  );
};

const RepositoryItemStats = ({ item }) => {
  return (
    <View style={styles.statsContainer}>
      <StatsItem
        label='Stars'
        data={item.stargazersCount}
        testID='stargazersCount'
      />
      <StatsItem label='Forks' data={item.forksCount} testID='forksCount' />
      <StatsItem label='Reviews' data={item.reviewCount} testID='reviewCount' />
      <StatsItem
        label='Rating'
        data={item.ratingAverage}
        testID='ratingAverage'
      />
    </View>
  );
};

const RepositoryItemGeneralInfo = ({ item }) => {
  return (
    <View style={styles.generalInfoContainer}>
      <Image
        style={styles.avatar}
        source={{ uri: `${item.ownerAvatarUrl}` }}
        testID='ownerAvatarUrl'
      />
      <View style={styles.detailsText}>
        <Text
          fontWeight='bold'
          style={styles.detailsTextItem}
          testID='fullName'
        >
          {item.fullName}
        </Text>
        <Text style={styles.detailsTextItem} color='grey' testID='description'>
          {item.description}
        </Text>
        <View style={styles.languageText}>
          <Text testID='language'>{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item, showGithubButton = false }) => {
  let history = useHistory();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => history.push(`repository/${item.id}`)}>
        <RepositoryItemGeneralInfo item={item} />
        <RepositoryItemStats item={item} />
        {showGithubButton && (
          <Button
            title='Open in Github'
            onPress={() => Linking.openURL(`${item.url}`)}
          />
        )}
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
