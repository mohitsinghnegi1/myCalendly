import React, { Component, isValidElement } from 'react';
import '../../assets/css/signin.css';
import { SignInUser } from '../../services/Authentication';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
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
      <div className='row d-flex mt-5'>
        <div className='col-md-5 m-auto  w-100 bg-white'>
          <form onSubmit={this.login}>
            <h3>Sign In</h3>
            <div className='error'>{this.state.errors.form}</div>
            <div className='form-group'>
              <label>Email address</label>
              <input
                onChange={this.onChange}
                type='email'
                name='email'
                className='form-control'
                placeholder='Enter email'
              />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <span className='forgot-password text-right float-right'>
                Forgot <a href='#'>password?</a>
              </span>
              <input
                onChange={this.onChange}
                type='password'
                name='password'
                className='form-control'
                placeholder='Enter password'
              />
            </div>

            <button type='submit' className='btn btn-primary btn-block'>
              Submit
            </button>
            <span>
              New user ?{' '}
              <span
                onClick={() => {
                  this.props.history.push('/SignUp');
                }}>
                Create account
              </span>
            </span>

            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default SignIn;
