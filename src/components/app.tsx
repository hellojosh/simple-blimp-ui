import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import Header from './header';
import LoginPage from '../pages/login';
import TablesPage from '../pages/tables';
import CreateTablePage from '../pages/create-table';
import UrlsPage from '../pages/urls';
import CreateUrlPage from '../pages/create-url';
import KeysPage from '../pages/access-keys';
import CreateKeyPage from '../pages/create-access-key';
import FourZeroFour from '../pages/four-zero-four';
import store from '../store';

function App() {
  return <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/tables" component={TablesPage} />
        <Route exact path="/tables/create" component={CreateTablePage} />
        <Route exact path="/tables/:name" component={CreateTablePage} />
        <Route exact path="/urls" component={UrlsPage} />
        <Route exact path="/urls/create" component={CreateUrlPage} />
        <Route exact path="/urls/:id" component={CreateUrlPage} />
        <Route exact path="/security" component={KeysPage} />
        <Route exact path="/keys/create" component={CreateKeyPage} />
        <Route component={FourZeroFour} />
      </Switch>
    </Router>
  </Provider>;
}

export default App;
