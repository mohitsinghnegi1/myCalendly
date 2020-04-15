import React, { Component } from 'react';
import fire from '../../config/fbConfig';
import '../../assets/css/home.css';
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
        <div>Hello {fire.auth().currentUser.displayName}</div>
        <div>
          <img
            src={fire.auth().currentUser.photoURL}
            className='profile-img'
            alt='your Img'
          />
        </div>
        <div>This is Home page</div>

        <button onClick={this.signOut}>SignOut</button>
      </div>
    );
  }
}
