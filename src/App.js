import React from 'react';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

const App = () => (
  <div>
    <PublicRoute path="/" exact component={RegistrationPage} />
    <PublicRoute path="/sign-up" exact component={RegistrationPage} />
    <PrivateRoute path="/dashboard" exact component={DashboardPage} />
  </div>
);

export default App;
