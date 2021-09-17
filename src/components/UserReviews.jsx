import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { format } from 'date-fns';
import { Button } from 'react-native-paper';
import theme from '../theme';
import Text from './Text';
import useUserReviews from '../hooks/useUserReviews';
import { useHistory } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'column',
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
  reviewButtons: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const ReviewItem = ({ review, refetch }) => {
  let history = useHistory();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDeleteReview = async id => {
    try {
      const { data } = await deleteReview({ variables: { id } });
      if (data.deleteReview) {
        refetch();
      }
    } catch (e) {
      console.log('E', e);
      throw e;
    }
  };

  const deleteAlert = () =>
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
        },
        { text: 'Delete', onPress: () => handleDeleteReview(review.id) },
      ]
    );

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
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
      <View style={styles.reviewButtons}>
        <Button
          style={{ backgroundColor: '#0165d4' }}
          labelStyle={{ color: 'white' }}
          onPress={() => history.push(`repository/${review.repositoryId}`)}
        >
          View Repository
        </Button>
        <Button
          style={{ backgroundColor: '#d6394c' }}
          labelStyle={{ color: 'white' }}
          onPress={deleteAlert}
        >
          Delete Button
        </Button>
      </View>
    </View>
  );
};

const UserReviewsContainer = ({ reviews, refetch }) => {
  const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];

  const renderItem = ({ item }) => (
    <ReviewItem review={item} refetch={refetch} />
  );

  return (
    <FlatList
      data={reviewNodes}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
    />
  );
};

const UserReviews = () => {
  const { reviews, refetch } = useUserReviews({ includeReviews: true });

  const refetchData = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

  if (!reviews) {
    return <Text>Loading...</Text>;
  }

  return <UserReviewsContainer reviews={reviews} refetch={refetchData} />;
};

export default UserReviews;
