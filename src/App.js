import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Auth, API, signInButton } from 'aws-amplify';
// import { withAuthenticator } from 'aws-amplify-react';
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
    async function fetch() {
      try {
        await Auth.signIn('hansam.park0103@gmail.com', 'password');
        const res = await API.get('Auth', '/items');
        console.log('[res]', res);
      } catch (error) {
        console.log('[error]', error);
      }
    }

    fetch();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
