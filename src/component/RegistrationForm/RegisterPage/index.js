/* eslint-disable react/no-unused-state,react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Validator from 'validator';
import PropTypes from 'prop-types';

class RegisterPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    };
  }

  onChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;
    const firstName = this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1);
    const lastName = this.state.lastName.charAt(0).toUpperCase() + this.state.lastName.slice(1);
    const data = { firstName, lastName, email, password, confirmPassword };
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.firstName) {
      errors.firstName = "Name can't be blank";
    } else if (data.firstName.length < 4 || data.firstName.length > 20) {
      errors.firstName = 'Name must be 4 to 20 characters long';
    }
    if (!data.lastName) {
      errors.lastName = "Name can't be blank";
    } else if (data.lastName.length < 4 || data.lastName.length > 20) {
      errors.lastName = 'Name must be 4 to 20 characters long';
    }
    if (!Validator.isEmail(data.email)) errors.email = 'Please enter a valid email address.';

    if (!data.password) {
      errors.password = "Password can't be blank";
    } else if (data.password.length < 4 || data.password.length > 20) {
      errors.password = 'Password must be 4 to 20 characters long';
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Password does not match';
    }
    return errors;
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Card>
          <CardContent>
            <div className="c4f-lgn-icn">
              <img src="/assets/login-icon.svg" width="auto" height="75" alt="login" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                id="standard-first-name"
                label="First Name"
                margin="normal"
                autoFocus
                style={{ width: '49%' }}
                fullWidth
                placeholder="Pravin"
                error={!!this.state.errors.firstName}
                autoComplete="off"
                helperText={this.state.errors.firstName}
                onChange={this.onChange('firstName')}
              />
              <TextField
                id="standard-last-name"
                label="Last Name"
                margin="normal"
                style={{ width: '49%' }}
                fullWidth
                placeholder="Yadav"
                autoComplete="off"
                error={!!this.state.errors.lastName}
                helperText={this.state.errors.lastName}
                onChange={this.onChange('lastName')}
              />
            </div>
            <div>
              <TextField
                id="standard-email"
                label="Email"
                type="email"
                margin="normal"
                fullWidth
                error={!!this.state.errors.email}
                autoComplete="off"
                helperText={this.state.errors.email}
                placeholder="example@example.com"
                onChange={this.onChange('email')}
              />
            </div>
            <div>
              <TextField
                id="password"
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                placeholder="Must have atleast 6 characters"
                autoComplete="off"
                error={!!this.state.errors.password}
                helperText={this.state.errors.password}
                onChange={this.onChange('password')}
              />
            </div>
            <div>
              <TextField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                margin="normal"
                fullWidth
                placeholder="Please confirm your password"
                autoComplete="off"
                error={!!this.state.errors.confirmPassword}
                helperText={this.state.errors.confirmPassword}
                onChange={this.onChange('confirmPassword')}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button color="primary" type="submit" fullWidth variant="contained" onClick={this.onSubmit}>
              Register
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

RegisterPage.propTypes = {
  submit: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(
  null,
  {},
)(RegisterPage);
