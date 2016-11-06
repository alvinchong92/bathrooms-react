import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from '../client/components/App.jsx';


const Routes = () => {
  return(
    <Router history={hashHistory}>
      <Route path="/" component={App} />
    </Router>
  );
};

export default Routes;
