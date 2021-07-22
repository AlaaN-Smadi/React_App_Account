import React from 'react';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
// import axios from 'axios';
import Profile from './component/profille';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MyFavoriteBooks from './BestBooks';


import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component {

  
  

  render() {
    // console.log('app', this.props);
    const { user,isAuthenticated } = this.props.auth0;
    
    return(
      <>
      {/* <LoginButton /> */}
      

        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                
                {isAuthenticated?<MyFavoriteBooks email={user.email} userName={user.name} />:null}
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

export default withAuth0(App);
