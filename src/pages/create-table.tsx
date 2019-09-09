import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

export default function CreateTablePage() {
  return <div className="container-lg px-3 py-5">
  	<div className="col-12 px-3">
  		<h3>Create Table</h3>
  		<hr />
  		<div className="col-6 centered">
  			<input className="form-control col-12 mb-4" type="text" placeholder="Name" />
  			<h5>Columns</h5>
  			<div className="bg-gray px-3 py-2 rounded-2 mt-2 mb-3">
  				<div className="form-checkbox m-0">
  				<label>
  					<input type="checkbox" checked="checked" aria-describedby="help-text-for-checkbox" onChange={() => {}} />
  					Auto create ID column
  				</label>
  				<p className="note">This is a <strong>unique</strong> and <strong>auto-incrementing</strong> column.</p>
  			</div>
  			</div>
  			<div className="d-flex mb-3">
  				<input className="form-control col-12" type="text" placeholder="Name" value="first_name" onChange={() => {}} />
  				<button className="btn ml-2">
  					Type <span className="fas fa-caret-down ml-1"></span>
  				</button>
  				<button className="btn btn-danger ml-2">
  					<i className="fas fa-trash-alt"></i>
  				</button>
  			</div>
  			<div className="d-flex mb-3">
  				<input className="form-control col-12" type="text" placeholder="Name" value="last_name" onChange={() => {}} />
  				<button className="btn ml-2">
  					Type <span className="fas fa-caret-down ml-1"></span>
  				</button>
  				<button className="btn btn-danger ml-2">
  					<i className="fas fa-trash-alt"></i>
  				</button>
  			</div>
  			<div className="d-flex mb-3">
  				<input className="form-control col-12" type="text" placeholder="Name" value="ssn" onChange={() => {}} />
  				<button className="btn ml-2">
  					Type <span className="fas fa-caret-down ml-1"></span>
  				</button>
  				<button className="btn btn-danger ml-2">
  					<i className="fas fa-trash-alt"></i>
  				</button>
  			</div>
  			<div className="d-flex mb-3">
  				<input className="form-control col-12" type="text" placeholder="Name" />
  				<button className="btn ml-2">
  					Type <span className="fas fa-caret-down ml-1"></span>
  				</button>
  				<button className="btn btn-danger ml-2">
  					<i className="fas fa-trash-alt"></i>
  				</button>
  			</div>
  			<div>
  				<button className="btn btn-outline mb-3" type="button">Add Column</button>
  			</div>
  			<div>
  				<button className="btn btn-primary mb-3 mt-4">Create</button>
  			</div>
  		</div>
  	</div>
  </div>;
}
