import React, { useState, useContext } from 'react';
import { If, Then, Else } from 'react-if';
import { LoginContext } from '../../Context/Auth/';

function Login() {
  const { loggedIn, login, logout } = useContext(LoginContext);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <If condition={loggedIn}>
      <Then>
        <button onClick={logout}>Log Out</button>
      </Then>
      <Else>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input name="username" onChange={handleChange} placeholder="login id" />
          <input name="password" onChange={handleChange} type="password" placeholder="password" />
          <button>Login</button>
        </form>
      </Else>
    </If>
  );
}

export default Login;
