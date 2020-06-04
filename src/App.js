import React, { useEffect } from 'react';
import { Auth, API, signInButton } from 'aws-amplify';
import Styled from 'styled-components';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import Home from './Pages/Home';
import Weekly from './Pages/Weekly';
import EditWeeklyPage from './Pages/EditWeeklyPage';
import Video from './Pages/Video';

import './App.css';

const Wrapper = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Navigation = Styled.div`
  position: absolute;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledLink = Styled(Link)`
  margin: 10px;
`;

const ContentWrapper = Styled.div`
  padding: 40px;
`;

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
    <Router>
      <div className="App">
        <Wrapper>
          <Navigation>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/videos/new">Videos</StyledLink>
            <StyledLink to="/weekly/new">Weekly</StyledLink>
          </Navigation>

          <ContentWrapper>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/videos/new" component={Video} />
              <Route path="/weekly/new" component={Weekly} />
              <Route path="/weekly/edit" component={EditWeeklyPage} />
            </Switch>
          </ContentWrapper>
        </Wrapper>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
