import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Link, withRouter } from "react-router-dom";

function Header({ location: { pathname }}) {
  if (pathname === '/') {
    return null;
  }

  return <div className="border-bottom px-3 d-flex flex-items-center bg-gray">
    <div className="col-3 px-3">
      <h4>Simple<span className="text-normal">Blimp</span></h4>
    </div>
    <div className="col-6">
      <div className="UnderlineNav-body d-flex flex-justify-center">
        <NavLink to="/urls" activeClassName="selected" className="UnderlineNav-item">URLs</NavLink>
        <NavLink to="/tables" activeClassName="selected" className="UnderlineNav-item">Tables</NavLink>
        <NavLink to="/security" activeClassName="selected" className="UnderlineNav-item">Security</NavLink>
        <NavLink to="/settings" activeClassName="selected" className="UnderlineNav-item">Settings</NavLink>
      </div>
    </div>
    <div className="col-3 px-3 text-right">
      <Link to="/" className="ml-2 link-gray">Logout</Link>
    </div>
  </div>;
}

export default withRouter(Header);
