import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="mx-auto mt-10 text-center" style={{ width: '100%', maxWidth: '380px' }}>
      <h4 className="mb-3">
Simple
        <span className="text-normal">Blimp</span>
      </h4>
      <input className="form-control col-12 mb-3" type="email" placeholder="Email" />
      <input className="form-control col-12 mb-3" type="password" placeholder="Password" />
      <Link to="/urls" className="btn btn-primary btn-block mb-3">
      Sign In
      </Link>
      <Link to="/urls" className="btn-link link-gray-dark no-underline btn-block">
        <i className="fab fa-github mr-1" />
      Sign In with Github
      </Link>
    </div>
  );
}
