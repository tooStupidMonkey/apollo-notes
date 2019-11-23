import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export default class LoginForm extends Component {
  state = { 
      email: '',
      password: ''
  };

  onChangeEmail = event => {
    const email = event.target.value;
    this.setState(s => ({ email }));
  };

  onChangePassword = event => {
    const password = event.target.value;
    this.setState({
      password
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.login({ variables: { email: this.state.email, password: this.state.password } });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            onChange={this.onChangeEmail}
          />
          <Input
            type="password"
            onChange={this.onChangePassword}
          />
          <Button type="submit">Log in</Button>
        </form>
      </div>
    );
  }
}