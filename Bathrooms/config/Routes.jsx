import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from '../client/components/App.jsx';
import NextView from '../client/components/Views/NextView.jsx';
import ThirdView from '../client/components/Views/ThirdView.jsx';
const Routes = () => {
  return(
    <Router history={hashHistory}>
      <Route path="/" component={App} />
      <Route path="nextview" component={NextView} />
      <Route path="thirdview" component={ThirdView} />
    </Router>
  );
};

export default Routes;
