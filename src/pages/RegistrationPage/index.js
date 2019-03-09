import React from 'react';
import PropTypes from 'prop-types';
import RegistrationForm from '../../component/RegistrationForm';

const RegistrationPage = props => {
  const { match, history } = props;
  const { path } = match || {};
  return (
    <div>
      <RegistrationForm path={path} history={history} />
    </div>
  );
};

RegistrationPage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default RegistrationPage;
