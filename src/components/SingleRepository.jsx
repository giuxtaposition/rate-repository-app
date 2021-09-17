import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import useRepository from '../hooks/useRepository';
import theme from '../theme';
import RepositoryItem from './RepositoryList/RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  rating: {
    width: 50,
    height: 50,
    borderColor: theme.colors.purple,
    borderWidth: 2,
    borderRadius: 50 / 2,
    alignSelf: 'flex-start',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  review: {
    marginLeft: 20,
    marginRight: 40,
    paddingRight: 20,
  },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showGithubButton={true} />;
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <Text
        fontWeight='bold'
        color='purple'
        fontSize='heading'
        style={styles.rating}
      >
        {review.rating}
      </Text>
      <View style={styles.review}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text color='grey'>
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

class SingleRepositoryContainer extends React.Component {
  renderHeader = () => {
    const { repository } = this.props;

    return <RepositoryInfo repository={repository} />;
  };

  render() {
    const { reviews, onEndReach } = this.props;

    const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];

    const renderItem = ({ item }) => <ReviewItem review={item} />;

    return (
      <FlatList
        data={reviewNodes}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, reviews, fetchMore } = useRepository({ first: 4, id });

  if (!repository) {
    return <Text>Loading...</Text>;
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <SingleRepositoryContainer
      reviews={reviews}
      onEndReach={onEndReach}
      repository={repository}
    />
  );
};

export default SingleRepository;
