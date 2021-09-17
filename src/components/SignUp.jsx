import React from 'react';
import FormikTextInput from './FormikTextInput';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import Text from './Text';

import useSignUp from '../hooks/useSignUp';

const initialValues = {
  username: '',
  password: '',
  confirmationPassword: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  confirmationPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required'),
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

export const SignInContainer = ({ signUp }) => {
  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
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
              name='username'
              placeholder='username'
              style={styles.inputField}
              testID='usernameField'
            />
            <FormikTextInput
              name='password'
              placeholder='password'
              secureTextEntry
              style={styles.inputField}
              testID='passwordField'
            />
            <FormikTextInput
              name='confirmationPassword'
              placeholder='Password confirmation'
              secureTextEntry
              style={styles.inputField}
              testID='confirmationPasswordField'
            />
            <TouchableOpacity onPress={handleSubmit} testID='submitButton'>
              <Text style={styles.submitButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();

  return <SignInContainer signUp={signUp} />;
};

export default SignUp;
