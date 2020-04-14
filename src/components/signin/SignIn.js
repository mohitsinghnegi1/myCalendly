import React, { Component, isValidElement } from 'react';
import '../../assets/css/signin.css';
import { SignInUser } from '../../services/Authentication';
import { withRouter } from 'react-router-dom';
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
          this.props.history.push('/Home');
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
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(SignIn);
