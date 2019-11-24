import React, { Component } from 'react';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px'
  },
  item: {
    marginBottom: '15px'
  },
  loginButton: {
    marginTop: '30px'
  }
};

class LoginForm extends Component {
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
    const { classes } = this.props;
    return (
      <div>
        <h1>Let s start:</h1>  
        <form 
          onSubmit={this.onSubmit}
          className={classes.root}
        >
          <Input
            type="text"
            onChange={this.onChangeEmail}
            className={classes.item}
          />
          <Input
            type="password"
            onChange={this.onChangePassword}
            className={classes.item}
          />
          <Button 
            type="submit"
            className={classes.loginButton}
          >
            Log in
          </Button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);