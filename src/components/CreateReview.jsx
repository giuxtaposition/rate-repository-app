import React from 'react';
import FormikTextInput from './FormikTextInput';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import Text from './Text';

import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('rating is required'),
  review: yup.string(),
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
  },
  formContainer: {
    padding: 5,
  },
  inputField: {
    padding: 5,
    margin: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    margin: 5,
    backgroundColor: theme.colors.purple,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
});

export const CreateReviewContainer = ({ createReview }) => {
  const onSubmit = async values => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      await createReview({
        ownerName,
        repositoryName,
        rating,
        text: review,
      });
    } catch (e) {
      console.log('error  ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.formContainer}>
            <FormikTextInput
              name='ownerName'
              placeholder='Repository owner name'
              style={styles.inputField}
              testID='repositoryOwnerField'
            />
            <FormikTextInput
              name='repositoryName'
              placeholder='Repository name'
              style={styles.inputField}
              testID='repositoryNameField'
            />
            <FormikTextInput
              name='rating'
              placeholder='Rating between 0 and 100'
              style={styles.inputField}
              testID='ratingField'
              keyboardType='number-pad'
            />
            <FormikTextInput
              name='review'
              placeholder='Review'
              secureTextEntry
              style={styles.inputField}
              testID='reviewField'
              multiline
            />
            <TouchableOpacity onPress={handleSubmit} testID='submitButton'>
              <Text style={styles.submitButton}>Create a Review</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();

  return <CreateReviewContainer createReview={createReview} />;
};

export default CreateReview;
