import React, { useReducer } from 'react';
import { Link } from "react-router-dom";

import KeysReducer, { DEFAULT_STATE } from '../store/reducers/keys';
import UrlsReducer, { DEFAULT_STATE as URLS_DEFAULT_STATE } from '../store/reducers/urls';

export default function AccessKeysPage() {
  const [ keysState, keysDispatch ] = useReducer(KeysReducer, DEFAULT_STATE);
  const [ urlsState ] = useReducer(UrlsReducer, URLS_DEFAULT_STATE);
  const keySelector = id => urlsState.filter(key => key.id === id)[0];
  const keyOutput = key => <div key={`url${key.id}`}>
    <span className="Label Label--outline">{key.method}</span> {key.route}
  </div>;

  return <div className="container-lg px-3 py-5">
  	<div className="col-12 px-3">
  		<div className="d-flex flex-items-center">
  			<h3 className="flex-auto">Access Keys</h3>
  			<Link to="/keys/create" className="link-gray">
  				<i className="fas fa-plus"></i>
  			</Link>
  		</div>
  		<hr />
  		<div className="d-flex flex-items-center mb-3">
  			<input className="form-control flex-auto" type="text" placeholder="Find a key..." />
  		</div>
  		<div className="Box Box--condensed">
  			<div className="Box-header Box-header--gray d-flex flex-items-center">
  				<div className="col-2 text-bold">Name</div>
  				<div className="col-5 text-bold">Key</div>
  				<div className="col-5 text-bold">Access</div>
  				<i className="fas fa-trash-alt v-hidden"></i>
  			</div>
        { keysState.map(key => <div key={key.id} className="Box-row d-flex text-mono lh-default">
  				<div className="col-2">
  					{key.name}
  				</div>
  				<div className="col-5">
            <Link to={`/keys/${key.key}`}>
      				{key.key}
      			</Link>
  				</div>
  				<div className="col-5">
            { key.accessIds.map(id => keyOutput(keySelector(id))) }
  				</div>
  				<a href="#" className="link-gray">
  					<i className="fas fa-trash-alt"></i>
  				</a>
  			</div>) }
  		</div>
  	</div>
  </div>;
}
