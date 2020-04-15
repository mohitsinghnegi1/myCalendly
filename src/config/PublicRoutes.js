import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from '../components/signup/SignUp';
import Error from '../components/error/Error';
import SignIn from '../components/signin/SignIn';
export default class PublicRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/SignUp' component={SignUp} />
        <Route exact path='/' component={SignIn} />
        <Route component={Error} />
      </Switch>
    );
  }
}
