import React, { useReducer } from 'react';
import { Link } from "react-router-dom";

import KeysReducer, { DEFAULT_STATE } from '../store/reducers/keys';

export default function CreateAccessKey() {
  const [ keysState, keysDispatch ] = useReducer(KeysReducer, DEFAULT_STATE);

  console.log('keysState', keysState);

  return <div className="container-lg px-3 py-5">
  	<div className="col-12 px-3">
  		<h3>Create Access Key</h3>
  		<hr />
  		<div className="col-6 centered">
  			<input className="form-control col-12 mb-4" type="text" placeholder="Name" value="Playstation v2" onChange={() => {}} />
  			<h5 className="mb-2">Access</h5>
  			<label className="border rounded-top-1 text-normal d-flex flex-items-center text-mono">
  				<span className="d-block border-right px-3 py-2 mr-3">
  					<input type="checkbox" />
  				</span>
  				<span className="Label Label--outline mr-2">GET</span>
  				<span>/people</span>
  			</label>
  			<label className="border border-top-0 text-normal d-flex flex-items-center text-mono">
  				<span className="d-block border-right px-3 py-2 mr-3">
  					<input type="checkbox" />
  				</span>
  				<span className="Label Label--outline mr-2">POST</span>
  				<span>/people</span>
  			</label>
  			<label className="border border-top-0 text-normal d-flex flex-items-center text-mono">
  				<span className="d-block border-right px-3 py-2 mr-3">
  					<input type="checkbox" checked onChange={() => {}} />
  				</span>
  				<span className="Label Label--outline mr-2">GET</span>
  				<span>/people/:id</span>
  			</label>
  			<label className="border border-top-0 rounded-bottom-1 text-normal d-flex flex-items-center text-mono">
  				<span className="d-block border-right px-3 py-2 mr-3">
  					<input type="checkbox" />
  				</span>
  				<span className="Label Label--outline mr-2">GET</span>
  				<span>/people</span>
  			</label>
  			<div>
  				<button className="btn btn-primary mb-3 mt-4">Create</button>
  			</div>
  		</div>
  	</div>
  </div>;
}
