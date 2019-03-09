/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Validator from 'validator';
import PropTypes from 'prop-types';

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
    };
  }

  onChange = name => e => {
    this.setState({
      [name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(data);
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Please enter a valid email address.';
    if (!data.password) {
      errors.password = "Password can't be blank";
    } else if (data.password.length < 6 || data.password.length > 20) {
      errors.password = 'Password must be 6 to 20 characters long';
    }
    return errors;
  };

  render() {
    const { errors } = this.props;
    const { emailErrorText, passwordErrorText } = errors;
    return (
      <form onSubmit={this.onSubmit}>
        <Card>
          <CardContent>
            <div className="c4f-lgn-icn">
              <img src="/assets/login-icon.svg" width="auto" height="75" alt="login" />
            </div>
            <div>
              <TextField
                id="standard-email"
                label="Email"
                margin="normal"
                autoFocus
                fullWidth
                error={!!emailErrorText || !!this.state.errors.email}
                helperText={(emailErrorText && emailErrorText) || this.state.errors.email}
                value={this.state.email}
                placeholder="example@example.com"
                onChange={this.onChange('email')}
              />
            </div>
            <div>
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                margin="normal"
                value={this.state.password}
                error={!!passwordErrorText || !!this.state.errors.password}
                autoComplete="off"
                helperText={(passwordErrorText && passwordErrorText) || this.state.errors.password}
                fullWidth
                placeholder="Must have atleast 6 characters"
                onChange={this.onChange('password')}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button type="submit" color="primary" fullWidth variant="contained" onClick={this.onSubmit}>
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

LoginPage.defaultProps = {
  errors: {},
};
LoginPage.propTypes = {
  submit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
};

const selector = state => {
  const { user } = state;
  const { errors } = user;
  return {
    errors,
  };
};
export default connect(
  selector,
  {},
)(LoginPage);
