import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

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

const StatsItem = ({ data, label }) => {
  if (data >= 1000) {
    data = Math.round((data / 1000) * 10) / 10;
    data += 'k';
  }
  return (
    <View>
      <Text style={styles.statsItemData}>{data}</Text>
      <Text style={styles.statsItemLabel}>{label}</Text>
    </View>
  );
};

const RepositoryItemStats = ({ item }) => {
  return (
    <View style={styles.statsContainer}>
      <StatsItem label='Stars' data={item.stargazersCount} />
      <StatsItem label='Forks' data={item.forksCount} />
      <StatsItem label='Reviews' data={item.reviewCount} />
      <StatsItem label='Rating' data={item.ratingAverage} />
    </View>
  );
};

const RepositoryItemGeneralInfo = ({ item }) => {
  return (
    <View style={styles.generalInfoContainer}>
      <Image style={styles.avatar} source={{ uri: `${item.ownerAvatarUrl}` }} />
      <View style={styles.detailsText}>
        <Text fontWeight='bold' style={styles.detailsTextItem}>
          {item.fullName}
        </Text>
        <Text style={styles.detailsTextItem}>{item.description}</Text>
        <View style={styles.languageText}>
          <Text>{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <RepositoryItemGeneralInfo item={item} />
      <RepositoryItemStats item={item} />
    </View>
  );
};

export default RepositoryItem;
