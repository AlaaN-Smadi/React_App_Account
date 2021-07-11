import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';

import Profile from './component/profille';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MyFavoriteBooks from './BestBooks';

class App extends React.Component {

  render() {
    console.log('app', this.props);
    return(
      <>
      {/* <LoginButton /> */}
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                <MyFavoriteBooks/>
              </Route>

              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default App;
