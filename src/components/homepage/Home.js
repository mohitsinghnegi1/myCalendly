import React, { Component } from 'react';
import fire from '../../config/fbConfig';
export default class Home extends Component {
  signOut() {
    fire
      .auth()
      .signOut()

      .catch((error) => {
        console.log('signout error : ', error);
      });
  }
  render() {
    return (
      <div>
        This is Home page
        <button onClick={this.signOut}>SignOut</button>
      </div>
    );
  }
}
