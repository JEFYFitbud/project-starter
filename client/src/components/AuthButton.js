import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import auth from '../services/auth';
import '../css/ProfilePage.css'

const classes = "button-edits";

const AuthButton = withRouter(({ history }) => {
  if(!auth.isAuthenticated) {
    return (
      <div>
        <Link className={classes} to="/login">Login</Link>
      </div>
    );
  }

  const logout = () => {
    // localStorage.setItem(auth.isAuthenticated, false);
    // localStorage.clear();
    auth.signout().then(() => history.push('/'));
  }

  return (
    <div>
      <button className={classes} onClick={logout} 
          style={{marginLeft: 30, backgroundColor: '#71737A',
          height: 50, width: 300, borderRadius: 30, marginTop: 30}}>
        Logout
      </button>
    </div>
  );
});

export default AuthButton;