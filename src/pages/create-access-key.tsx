import React, { useState, useCallback, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';

import { useStateValue } from '../reducer/state';
import { CREATE_KEY, UPDATE_KEY, DELETE_KEY } from '../reducer';

interface CreateAccessKeyProps {
  match: {
    params: {
      id: string
    }
  };
}

export default function CreateAccessKey({ match }: CreateAccessKeyProps) {
  const [{ keys, urls }, dispatch] = useStateValue();
  const isNewKey = useMemo(() => match.params.id === undefined, [match.params.id]);
  const key = useMemo(
    () => keys.find((value) => value.id === parseInt(match.params.id, 10)) || { name: '', key: '', accessIds: [] },
    [keys, match.params.id],
  );
  const [goBack, setGoBack] = useState(false);
  const [name, setName] = useState(key.name);
  const [nameError, setNameError] = useState(false);
  const [accessIds, setAccessIds] = useState(key.accessIds);

  const setGoBackCallback = useCallback(() => setGoBack(true), []);
  const setAccessIdCallback = (e: any) => {
    e.persist();

    setAccessIds((newAccessIds) => {
      const { checked, value } = e.target;
      const intValue = parseInt(value, 10);

      if (checked) {
        return [...newAccessIds, intValue];
      }

      return newAccessIds.filter((accessId) => accessId !== intValue);
    });
  };
  const createOnClick = () => {
    if (name.trim().length === 0) {
      setNameError(true);

      return;
    }

    if (isNewKey) {
      dispatch({ type: CREATE_KEY, value: { name, accessIds } });
    } else {
      dispatch({ type: UPDATE_KEY, value: { ...key, name, accessIds } });
    }

    setGoBackCallback();
  };
  const deleteOnClick = () => {
    dispatch({ type: DELETE_KEY, id: key.id });
    setGoBack(true);
  };

  if (goBack || (!isNewKey && key.key === '')) {
    return <Redirect to="/keys" />;
  }

  return (
    <div className="container-lg px-3 py-5">
      <div className="col-12 px-3">
        <div className="d-flex flex-items-center flex-justify-between position-relative">
          { isNewKey && <h3>Create Access Key</h3> }
          { !isNewKey && <h3>Edit Access Key</h3> }
          { !isNewKey && <button type="button" className="btn-link text-red" onClick={deleteOnClick}>Delete Key</button> }
        </div>
        <hr />
        <div className="col-6 centered">
          <input className={classnames('form-control col-12', { 'border-red': nameError })} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <div className={classnames('note mb-4', { 'text-red': nameError })}>Name is required</div>
          <h5 className="mb-2">Access</h5>
          { urls.map((url, index) => (
            <label htmlFor={`${url.route}${index}`} key={url.id} className={classnames('border text-normal d-flex flex-items-center text-mono', { 'border-top-0': index > 0, 'rounded-top-1': index === 0, 'rounded-bottom-1': index === urls.length - 1 })}>
              <span className="d-block border-right px-3 py-2 mr-3">
                <input type="checkbox" value={url.id} checked={accessIds.indexOf(url.id) > -1} onChange={setAccessIdCallback} id={`${url.route}${index}`} />
              </span>
              <span className="Label Label--outline mr-2">{url.method}</span>
              <span>{url.route}</span>
            </label>
          )) }
          { urls.length === 0 && <div className="border text-normal d-flex flex-items-center text-mono rounded-1 px-3 py-2">No URLs</div> }
          <div className="d-flex flex-items-center mb-3 mt-4">
            <button type="button" className="btn btn-primary mr-4" onClick={createOnClick}>
              { isNewKey && <>Create</> }
              { !isNewKey && <>Update</> }
            </button>
            <button type="button" className="btn-link text-red" onClick={setGoBackCallback}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
