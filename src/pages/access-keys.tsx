import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

export default function AccessKeysPage() {
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
  			<div className="Box-row d-flex text-mono lh-default">
  				<div className="col-2">
  					iPhone App
  				</div>
  				<div className="col-5">
  					<a href="#">a5s6a6d57d889ddsd7s6dsd98</a>
  				</div>
  				<div className="col-5">
  					<div><span className="Label Label--outline">GET</span> /people</div>
  					<div><span className="Label Label--outline">POST</span> /people</div>
  					<div><span className="Label Label--outline">GET</span> /people/:id</div>
  				</div>
  				<a href="#" className="link-gray">
  					<i className="fas fa-trash-alt"></i>
  				</a>
  			</div>
  			<div className="Box-row d-flex text-mono lh-default">
  				<div className="col-2">
  					Apple TV
  				</div>
  				<div className="col-5">
  					<a href="#">a5s6a6d57d889ddsd7s6dsd98</a>
  				</div>
  				<div className="col-5">
  					<div><span className="Label Label--outline">GET</span> /people</div>
  				</div>
  				<a href="#" className="link-gray">
  					<i className="fas fa-trash-alt"></i>
  				</a>
  			</div>
  		</div>
  	</div>
  </div>;
}
