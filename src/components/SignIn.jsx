import React from 'react';
import FormikTextInput from './FormikTextInput';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
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

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
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
              name='username'
              placeholder='username'
              style={styles.inputField}
            />
            <FormikTextInput
              name='password'
              placeholder='password'
              secureTextEntry
              style={styles.inputField}
            />
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.submitButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
