import React, { Component, isValidElement } from 'react';
import '../../assets/css/signin.css';
import { SignInUser } from '../../services/Authentication';
import { withRouter } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import '../../assets/css/util.css';
import '../../assets/css/signin.css';
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: null,
        password: null,
        form: null,
      },
    };

    this.login = this.login.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  isValid() {
    if (this.state.email && this.state.password) {
      return true;
    }
    return false;
  }

  login(e) {
    e.preventDefault();
    if (this.isValid()) {
      console.log('add new login to firestore');
      console.log(this.state);
      var response = SignInUser(this.state);
      console.log('signin call happended');
      response
        .then((data) => {
          console.log('User is authorised', data);
          // this.props.history.push('/Home');
        })
        .catch((error) => {
          console.log('Login error ', error);
          var errMsg = error.message;
          this.setState({ errors: { form: errMsg } });
        });
    } else {
      console.log('invalid val', this.state);
    }
  }
  onChange(e) {
    const { name, value } = e.target;
    // console.log('name', name, 'val', value);
    this.setState({ [name]: value });
    // console.log(this.state);
  }
  render() {
    var uiConfig = {
      callbacks: {
        signInSuccess: () => false,
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      // signInSuccessUrl: '/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,

        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    return (
      <div className='row vw-100 ml-0 mr-0'>
        <div class='login100-more back col-lg-7 d-none d-lg-block'></div>
        <form
          autoComplete='none'
          class='login100-form validate-form col-lg-5 pt-0 pb-0  pl-md-5 pr-md-5 d-flex '
          onSubmit={this.login}>
          <span class='login100-form-title p-b-34'>Account Login</span>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <h4 className='sep mb-4'>&nbsp;OR&nbsp;</h4>
          <div className='error mb-3'>{this.state.errors.form}</div>
          <div className='d-md-flex'>
            <div
              class='wrap-input100 rs1-wrap-input100 validate-input m-b-20'
              data-validate='Type user name'>
              <input
                autoComplete='none'
                id='email'
                class='input100'
                type='email'
                name='email'
                placeholder='Email Address'
                onChange={this.onChange}
              />
              <span class='focus-input100'></span>
            </div>
            <div
              class='wrap-input100 rs2-wrap-input100 validate-input m-b-20'
              data-validate='Type password'>
              <input
                autoComplete='new-password'
                class='input100'
                type='password'
                name='password'
                placeholder='Password'
                onChange={this.onChange}
              />
              <span class='focus-input100'></span>
            </div>
          </div>
          <div class='container-login100-form-btn'>
            <input type='submit' class='login100-form-btn' value='Sign In' />
          </div>

          <div class='w-full text-center p-t-27 p-b-10 cur-pointer'>
            <span class='txt1'>Forgot&nbsp;</span>

            <a href='#' class='txt2'>
              password?
            </a>
          </div>

          <div class='w-full text-center'>
            <span
              onClick={() => {
                console.log(this.props);
                this.props.updateWidget({ widgetName: 'SIGNUP' });
              }}
              class='txt3 cur-pointer'>
              Sign Up
            </span>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(SignIn);
