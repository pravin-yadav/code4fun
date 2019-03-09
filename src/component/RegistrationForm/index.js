/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage';
import { login, signup } from '../../actions/userControl';
import RegisterPage from './RegisterPage';

class RegistrationForm extends React.PureComponent {
  onRegisterSubmit = data => this.props.signup(data, this.props.history);

  onLoginSubmit = data => this.props.login(data, this.props.history);

  render() {
    const { path, history } = this.props;
    return (
      <div className="rgstr-frm-cnt">
        <div className="rgstr-frm-lnk">
          <NavLink to="/" exact className="rgstr-frm-lnk-txt" activeClassName="selected">
            Login
          </NavLink>
          <NavLink to="/sign-up" className="rgstr-frm-lnk-txt" activeClassName="selected">
            Register
          </NavLink>
        </div>
        <div>
          {path === '/sign-up' ? (
            <RegisterPage history={history} submit={this.onRegisterSubmit} />
          ) : (
            <LoginPage history={history} submit={this.onLoginSubmit} />
          )}
        </div>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  path: PropTypes.string.isRequired,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  { signup, login },
)(RegistrationForm);
