import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

export default function TablesPage() {
  return <div className="container-lg px-3 py-5">
    <div className="col-12 px-3">
      <div className="d-flex flex-items-center">
        <h3 className="flex-auto">Tables</h3>
        <Link to="/tables/create" className="link-gray">
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      <hr />
      <div className="d-flex flex-items-center mb-3">
        <input className="form-control flex-auto" type="text" placeholder="Find a Table..." />
      </div>
      <div className="Box Box--condensed">
        <div className="Box-header Box-header--gray d-flex flex-items-center">
          <div className="col-12"><strong>Name</strong></div>
        </div>
        <div className="Box-row d-flex flex-items-center text-mono">
          <div className="col-12">accounts</div>
          <a href="#" className="link-gray">
            <i className="fas fa-trash-alt"></i>
          </a>
        </div>
        <div className="Box-row d-flex flex-items-center text-mono">
          <div className="col-12">products</div>
          <a href="#" className="link-gray">
            <i className="fas fa-trash-alt"></i>
          </a>
        </div>
        <div className="Box-row d-flex flex-items-center text-mono">
          <div className="col-12">transactions</div>
          <a href="#" className="link-gray">
            <i className="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    </div>
  </div>;
}
