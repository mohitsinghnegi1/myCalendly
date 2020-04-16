import React, { Component, isValidElement } from 'react';
import '../../assets/css/signin.css';
import { CreateUser } from '../../services/Authentication';
export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {
        email: null,
        password: null,
        form: null,
      },
    };
    this.SubmitForm = this.SubmitForm.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  isValid() {
    if (this.state.email && this.state.password) {
      return true;
    }
    return false;
  }

  SubmitForm(e) {
    e.preventDefault();
    if (this.isValid()) {
      console.log('call to signup api which will return promise');
      var response = CreateUser(this.state);
      var that = this;
      response
        .then((data) => {
          console.log('reponse is resolved ', data);
          alert('User Registered Successfully');
          that.props.history.push('/');
        })
        .catch((error) => {
          // Handle Errors here.
          var errMsg = error.message;
          this.setState({ errors: { form: errMsg } });
          //   console.log('state ', this.state);
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
    return (
      <div className='row vw-100 ml-0 mr-0'>
        <div class='login100-more back col-lg-7 d-none d-lg-block'></div>
        <form
          autoComplete='none'
          class='login100-form validate-form col-lg-5 pt-0 pb-0  pl-md-5 pr-md-5 d-flex '
          onSubmit={this.SubmitForm}>
          <span class='login100-form-title p-b-34'>Create Account</span>

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
            <input type='submit' class='login100-form-btn' value='Sign Up' />
          </div>

          <div class='w-full text-center mt-5'>
            <span
              onClick={() => {
                console.log(this.props);
                this.props.updateWidget({ widgetName: 'SIGNIN' });
              }}
              class='txt3 cur-pointer'>
              Sign In
            </span>
          </div>
        </form>
      </div>
    );
  }
}
