import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


function Login({ setAuthenticated }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState();
  return (
    <div className="Login">
      {auth && <Redirect to="/" />}
      <form
        className="Login__form"
        onSubmit={(e) => {
          e.preventDefault();
          axios.post('http://localhost:4000/api/v1/login', { name, password })
          
          .then((res) => {
              localStorage.setItem('circus-token', res.data.token);
              setAuthenticated(true);
              setAuth(true);            
            })
            .catch(() => {
              setError(true);
              setTimeout(() => setError(false), 3000);
            });
        }}
      >
        <label htmlFor="name" className="has-float-label">
          <input
            id="name"
            className="Login__form--input"
            type="text"
            name="name"
            placeholder="namename"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
          <span>name</span>
        </label>
        <label htmlFor="password" className="has-float-label">
          <input
            id="password"
            type="password"
            className="Login__form--input"
            name="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <span>Mot de passe</span>
        </label>
        <button
          type="submit"
          className={
            !(name !== '' && password !== '')
              ? 'Login__form--submit disable'
              : 'Login__form--submit'
          }
          disabled={!(name !== '' && password !== '')}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;