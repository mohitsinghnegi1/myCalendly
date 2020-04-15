import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/homepage/Home';
import Error from '../components/error/Error';

export default class PrivateRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />

        <Route component={Error} />
      </Switch>
    );
  }
}
