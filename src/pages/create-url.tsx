import React, { useState, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';

import { useStateValue } from '../state';
import { ADD_ROUTE, UPDATE_ROUTE, DELETE_URL } from '../reducer';

interface CreateUrlPageProps {
  match: object;
}

const DEFAULT_URL = { route: '', sql: '', method: '' };

export default function CreateUrlPage({ match }: CreateUrlPageProps) {
  const [{ urls }, dispatch] = useStateValue();
  const isNewRoute = useMemo(() => match.params.id === undefined, [match.params.id]);
  const url = useMemo(
    () => urls.find((v) => v.id === parseInt(match.params.id, 10)) || DEFAULT_URL,
    [urls, match.params.id],
  );
  const [route, setRoute] = useState(url.route);
  const [routeError, setRouteError] = useState(false);
  const [method, setMethod] = useState(url.method);
  const [methodError, setMethodError] = useState(false);
  const [sql, setSql] = useState(url.sql);
  const [sqlError, setSqlError] = useState(false);
  const [goBack, setGoBack] = useState(false);

  const createOnClick = () => {
    const newRoute = route.trim();
    const newMethod = method.trim();
    const newSql = sql.trim();

    setRouteError(newRoute === '');
    setMethodError(newMethod === '');
    setSqlError(newSql === '');

    if (newRoute === '' || newMethod === '' || newSql === '') {
      return;
    }

    if (isNewRoute) {
      dispatch({ type: ADD_ROUTE, value: { route: newRoute, method: newMethod, sql: newSql } });
    } else {
      dispatch({
        type: UPDATE_ROUTE,
        value: {
          id: url.id, route: newRoute, method: newMethod, sql: newSql,
        },
      });
    }

    setGoBack(true);
  };
  const deleteOnClick = () => {
    dispatch({ type: DELETE_URL, id: url.id });
    setGoBack(true);
  };

  if (goBack || (!isNewRoute && url.route === '')) {
    return <Redirect to="/urls" />;
  }

  return (
    <div className="container-lg px-3 py-5">
      <div className="col-12 px-3">
        <div className="d-flex flex-items-center flex-justify-between position-relative">
          { isNewRoute && <h3>Create URL</h3> }
          { !isNewRoute && <h3>Edit URL</h3> }
          { !isNewRoute && <button type="button" className="btn-link text-red" onClick={deleteOnClick}>Delete Route</button> }
        </div>
        <hr />
        <div className="col-6 centered">
          <div className="mb-3">
            <input className={classnames('form-control col-12', { 'border-red': routeError })} type="text" placeholder="Route" value={route} onChange={(e) => setRoute(e.target.value)} />
          </div>
          <div className="mb-3">
            <select className={classnames('form-select', { 'border-red': methodError })} value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="">Method</option>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
          <div className="mb-3">
            <textarea className={classnames('form-control col-12 text-mono', { 'border-red': sqlError })} rows="10" placeholder="SQL" value={sql} onChange={(e) => setSql(e.target.value)} />
          </div>
          <div className="d-flex flex-items-center flex-justify-between mb-3">
            <div>
              <button type="button" className="btn btn-primary mr-4" onClick={createOnClick}>
                { isNewRoute && <>Create</> }
                { !isNewRoute && <>Update</> }
              </button>
              <button type="button" className="btn-link text-red" onClick={() => setGoBack(true)}>Cancel</button>
            </div>
            <span className="note ml-auto">All fields are required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
