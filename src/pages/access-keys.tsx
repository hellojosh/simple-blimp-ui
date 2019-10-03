import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useStateValue } from '../reducer/state';
import { DELETE_KEY } from '../reducer';
import { fullSearchByKeys } from '../utilities';

export default function AccessKeysPage() {
  const [{ keys, urls }, dispatch] = useStateValue();
  const [searchPhrase, setSearchPhrase] = useState('');
  const urlSelector = useCallback((id) => urls.find((url) => url.id === id), [urls]);
  const filteredKeys = useMemo(() => fullSearchByKeys(keys, ['name', 'key'], searchPhrase), [keys, searchPhrase]);

  return (
    <div className="container-lg px-3 py-5">
      <div className="col-12 px-3">
        <div className="d-flex flex-items-center">
          <h3 className="flex-auto">Access Keys</h3>
          <Link to="/keys/create" className="link-gray">
            <i className="fas fa-plus" />
          </Link>
        </div>
        <hr />
        <div className="d-flex flex-items-center mb-3">
          <input className="form-control flex-auto" type="text" placeholder="Find a key..." value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} />
          <button type="button" className="btn-link ml-3" onClick={() => setSearchPhrase('')}>Reset</button>
        </div>
        <div className="Box Box--condensed">
          <div className="Box-header Box-header--gray d-flex flex-items-center">
            <div className="col-3 text-bold">Name</div>
            <div className="col-5 text-bold">Key</div>
            <div className="col-4 text-bold">Access</div>
            <i className="fas fa-trash-alt v-hidden" />
          </div>
          { filteredKeys.map((key) => (
            <div key={key.id} className="Box-row d-flex text-mono lh-default">
              <div className="col-3 pr-3 flex-shrink-0">
                <Link to={`/keys/${key.id}`} className="css-truncate css-truncate-target">
                  {key.name}
                </Link>
              </div>
              <div className="col-5">{key.key}</div>
              <div className="col-4">
                { key.accessIds.map((accessId) => {
                  const { method, route } = urlSelector(accessId);

                  return (
                    <div key={`url${accessId}`}>
                      <span className="Label Label--outline mr-1">{method}</span>
                      {route}
                    </div>
                  );
                }) }
              </div>
              <div>
                <button type="button" className="link-gray btn-link" onClick={() => dispatch({ type: DELETE_KEY, id: key.id })}>
                  <i className="fas fa-trash-alt fa-fw" />
                </button>
              </div>
            </div>
          )) }
          { filteredKeys.length === 0 && (
            <div className="Box-row d-flex flex-items-center text-mono">
              No Results
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}
