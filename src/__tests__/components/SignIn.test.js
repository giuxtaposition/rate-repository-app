import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const signIn = jest.fn();
      // render the SignInContainer component, fill the text inputs and press the submit button

      const { getByTestId } = render(<SignInContainer signIn={signIn} />);

      fireEvent.changeText(getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(getByTestId('passwordField'), 'password');

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        fireEvent.press(getByTestId('submitButton'));
        expect(signIn).toHaveBeenCalledTimes(1);

        expect(signIn.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
