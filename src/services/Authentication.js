import React from 'react';
import firebase from '../config/fbConfig';
const CreateUser = (userInfo) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
};

const SignInUser = (userInfo) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(userInfo.email, userInfo.password);
};

export { CreateUser, SignInUser };
