import React, {useContext, useState} from 'react';
import {If, Then, Else} from 'react-if';
import {LoginContext} from '../../Context/Auth/';

function Login (props) {

  const context = useContext(LoginContext);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: '',
  //     password: ''
  //   };
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    context.login( username, password);
  }

  const handleChange = (e) => {
    e.target.name === "username" && setUsername(e.target.value);
    e.target.name === "password" && setPassword(e.target.value);
    // this.setState( { [e.target.name] :e.target.value } );
  }

      return (
        <If condition = {context.loggedIn}>
          <Then>
              <button onClick={context.logout}>Log Out</button>
          </Then>
          <Else>
              <form className= "loginForm" onSubmit={handleSubmit}>
                <input name="username" onChange={handleChange} placeholder="login id" />
                <input name="password" onChange={handleChange} type="password" placeholder="password" />
                <button>Login</button>
              </form>
          </Else>
        </If>
      )
  }



export default Login;