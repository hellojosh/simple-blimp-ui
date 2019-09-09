import React, { Fragment, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import classnames from 'classnames';

import { getUrlById } from '../store/selectors';
import { addRoute, deleteRoute, updateRoute } from '../store/actions/urls';

const DEFAULT_URL = { route: '', sql: '', method: '' };

function CreateUrlPage({ match, url = DEFAULT_URL, addRouteAction, deleteRouteAction, updateRouteAction }) {
  const isNewRoute = match.params.id === undefined;

  const [ route, setRoute ] = useState(url.route);
  const [ routeError, setRouteError ] = useState(false);
  const [ method, setMethod ] = useState(url.method);
  const [ methodError, setMethodError ] = useState(false);
  const [ sql, setSql ] = useState(url.sql);
  const [ sqlError, setSqlError ] = useState(false);
  const [ goBack, setGoBack ] = useState(false);

  const routeOnChange = e => setRoute(e.target.value);
  const methodOnChange = e => setMethod(e.target.value);
  const sqlOnChange = e => setSql(e.target.value);
  const createOnClick = () => {
    let _route = route.trim()
    let _method = method.trim()
    let _sql = sql.trim()
    let failed = _route === '' || _method === '' || _sql === '';

    setRouteError(_route === '')
    setMethodError(_method === '')
    setSqlError(_sql === '')

    if (failed) {
      return
    }

    if (isNewRoute) {
      addRouteAction(_route, _method, _sql);
    } else {
      updateRouteAction(url.id, _route, _method, _sql);
    }

    setGoBack(true);
  };
  const deleteOnClick = () => {
    deleteRouteAction(url.id);
    setGoBack(true);
  };

  if (goBack) {
    return <Redirect to="/urls" />
  }

  return <div className="container-lg px-3 py-5">
  	<div className="col-12 px-3">
      <div className="d-flex flex-items-center flex-justify-between position-relative">
        { isNewRoute && <h3>Create URL</h3> }
        { !isNewRoute && <h3>Edit URL</h3> }
        { !isNewRoute && <button className="btn-link text-red" onClick={deleteOnClick}>Delete Route</button> }
      </div>
  		<hr />
  		<div className="col-6 centered">
        <div className="mb-3">
          <input className={classnames(`form-control col-12 input-contrast`, { 'border-red': routeError })} type="text" placeholder="Route" value={route} onChange={routeOnChange} />
        </div>
        <div className="mb-3">
          <select className={classnames('form-select', { 'border-red': methodError })} value={method} onChange={methodOnChange}>
            <option value="">Method</option>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div className="mb-3">
          <textarea className={classnames('form-control col-12 text-mono input-contrast', { 'border-red': sqlError })} rows="10" placeholder="SQL" value={sql} onChange={sqlOnChange}></textarea>
        </div>
  			<div className="d-flex flex-items-center flex-justify-between mb-3">
          <button className="btn btn-primary" onClick={createOnClick}>
            { isNewRoute && <Fragment>Create</Fragment> }
            { !isNewRoute && <Fragment>Update</Fragment> }
          </button>
          <span className="note">All fields are required</span>
        </div>
  		</div>
  	</div>
  </div>;
}

const mapStateToProps = (state, ownProps) => ({
  url: getUrlById(state, ownProps),
})

const mapDispatchToProps = dispatch => ({
  addRouteAction: (route, method, sql) => dispatch(addRoute(route, method, sql)),
  deleteRouteAction: id => dispatch(deleteRoute(id)),
  updateRouteAction: (id, route, method, sql) => dispatch(updateRoute(id, route, method, sql)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUrlPage)
