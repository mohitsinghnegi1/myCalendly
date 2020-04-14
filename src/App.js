import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import SignIn from './components/signin/SignIn';
import Home from './components/homepage/Home';
function App() {
  return (
    <div className='App container-fluid  '>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SignIn}></Route>
          <Route exact path='/SignUp' component={SignUp}></Route>
          <Route exact path='/Home' component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
