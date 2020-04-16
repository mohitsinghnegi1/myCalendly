import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import SignIn from './components/signin/SignIn';
import PublicRoutes from './config/PublicRoutes';
import PrivateRoutes from './config/PrivateRoutes';
import Home from './components/homepage/Home';
import fire from './config/fbConfig';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    var that = this;
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        // user is signed in
        console.log(user);
        that.setState({ user });
      } else {
        that.setState({ user: null });
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className='App  '>
          {this.state.user ? <PrivateRoutes /> : <PublicRoutes />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
