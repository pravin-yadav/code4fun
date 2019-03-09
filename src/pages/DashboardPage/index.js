/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {logout} from '../../actions/userControl';

class DashboardPage extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('');
  }
  
  render() {
    const {user, history} = this.props;
    const {profile} = user || {};
    const {firstName, lastName} = profile || {};
    return (
      <div style={{textAlign: 'center', marginTop: 20}}>
        <h1>{`Welcome ${firstName} ${lastName} To the your Dashboard`}</h1>
        <div style={{marginTop: 50}}>
          <Button color="primary" variant="contained" onClick={() => this.props.logout(history)}>
            Logout
          </Button>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  user: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
};

const selector = state => {
  const {user} = state;
  return {
    user,
  };
};

export default connect(
  selector,
  {logout},
)(DashboardPage);
