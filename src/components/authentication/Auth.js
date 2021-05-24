import React, { useState, useEffect } from 'react';
import FirebaseConfig from '../../firebaseConfig';
import '../../App.css';

import Login from './Login';
import MainView from '../main/MainView';

export default function Auth() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearErrors();
    FirebaseConfig.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disable':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
          default:
            setPasswordError(err.message);
            break;
        }
      });
  };

  // const handleSignUp = () => {
  //   clearErrors();
  //   FirebaseConfig.auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .catch((err) => {
  //       switch (err.code) {
  //         case 'auth/email-already-in-use':
  //         case 'auth/invalid-email':
  //           setEmailError(err.message);
  //           break;
  //         case 'auth/weak-password':
  //           setPasswordError(err.message);
  //           break;
  //         default:
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     });
  // };

  const handleLogOut = () => {
    FirebaseConfig.auth().signOut();
  };

  const authListener = () => {
    FirebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      {user ? (
        <MainView handleLogOut={handleLogOut} />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          // handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
}
