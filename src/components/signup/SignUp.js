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
      <div className='row d-flex mt-5'>
        <div className='col-md-5 m-auto  w-100 bg-white'>
          <form onSubmit={this.SubmitForm}>
            <h3>Sign Up</h3>
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

              <input
                onChange={this.onChange}
                type='password'
                name='password'
                className='form-control'
                placeholder='Enter password'
              />
            </div>

            <div className='form-group'>
              <div className='custom-control custom-checkbox'>
                <input
                  type='checkbox'
                  className='custom-control-input'
                  id='customCheck1'
                />
                <label className='custom-control-label' htmlFor='customCheck1'>
                  Remember me
                </label>
              </div>
            </div>

            <button type='submit' className='btn btn-primary btn-block'>
              Submit
            </button>
            <span>
              Already have a account?
              <span onClick={() => this.props.history.push('/')}>Login</span>
            </span>
          </form>
        </div>
      </div>
    );
  }
}
