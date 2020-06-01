import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Auth, API, signInButton } from 'aws-amplify';
import Weekly from './components/Weekly';
import { withAuthenticator } from 'aws-amplify-react';
import './App.css';

function App() {
  useEffect(() => {
    // async function signIn() {
    //   try {
    //     await Auth.signUp('user@tutorial.com', 'password');
    //     console.log('[]');
    //   } catch (error) {
    //     console.log('[signupError]', error);
    //   }
    // }
    // signIn();
    // async function fetch() {
    //   try {
    //     await Auth.signIn('hansam.park0103@gmail.com', 'password');
    //     const res = await API.get('Auth', '/items');
    //     console.log('[res]', res);
    //   } catch (error) {
    //     console.log('[error]', error);
    //   }
    // }
    // fetch();
  });

  return (
    <div className="App">
      <Weekly />
    </div>
  );
}

export default withAuthenticator(App);
