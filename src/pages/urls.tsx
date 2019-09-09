import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import classnames from 'classnames';

import { deleteRoute } from '../store/actions/urls';

const DEFAULT_METHOD_FILTERS = { get: false, post: false, put: false, delete: false };

const filterUrls = (urls, phrase = '', methods = {}) => {
  let _phrase = phrase.toLowerCase().trim()

  let _methods = Object.entries(methods).filter(v => v[1]).map(v => v[0])
      _methods = _methods.length === 0 ? Object.keys(methods) : _methods

  return urls.filter(url => {
    let route = url.route.toLowerCase()
    let method = url.method.toLowerCase()

    return route.indexOf(_phrase) > -1 && _methods.indexOf(method) > -1
  })
};

function UrlsPage({ urls, deleteRouteAction }) {
  const [ searchPhrase, setSearchPhrase ] = useState('');
  const [ methodFilters, setMethodFilters ] = useState(DEFAULT_METHOD_FILTERS);

  const resetFiltersOnClick = () => {
    setSearchPhrase('');
    setMethodFilters(DEFAULT_METHOD_FILTERS);
  };
  const searchPhraseOnChange = e => setSearchPhrase(e.target.value);
  const methodFilterOnClick = method => () => setMethodFilters({ ...methodFilters, [method]: !methodFilters[method] });
  const deleteOnClick = id => {
    return () => {
      deleteRouteAction(id);
    };
  };

  let _urls = filterUrls(urls, searchPhrase.toLowerCase(), methodFilters)

  return <div className="container-lg px-3 py-5">
  	<div className="col-12 px-3">
  		<div className="d-flex flex-items-center">
  			<h3 className="flex-auto">URLs</h3>
  			<Link to="/urls/create" className="link-gray">
  				<i className="fas fa-plus"></i>
  			</Link>
  		</div>
  		<hr />
  		<div className="d-flex flex-items-center mb-3">
  			<input className="form-control flex-auto" type="text" placeholder="Find a URL..." value={searchPhrase} onChange={searchPhraseOnChange} />
  			<div className="subnav m-0 ml-3">
  				<nav className="subnav-links">
  					<button className={classnames('subnav-item', { selected: methodFilters.get })} onClick={methodFilterOnClick('get')}>GET</button>
  					<button className={classnames('subnav-item', { selected: methodFilters.post })} onClick={methodFilterOnClick('post')}>POST</button>
  					<button className={classnames('subnav-item', { selected: methodFilters.put })} onClick={methodFilterOnClick('put')}>PUT</button>
  					<button className={classnames('subnav-item', { selected: methodFilters.delete })} onClick={methodFilterOnClick('delete')}>DELETE</button>
  				</nav>
  			</div>
        <button className="btn-link ml-3" onClick={resetFiltersOnClick}>Reset</button>
  		</div>
  		<div className="Box Box--condensed">
  			<div className="Box-header Box-header--gray d-flex flex-items-center">
  				<i className="fas fa-bars mr-3 v-hidden"></i>
  				<div className="col-6"><strong>Route</strong></div>
  				<div className="col-6"><strong>Method</strong></div>
  				<span className="btn-link v-hidden">
  					<i className="fas fa-trash-alt fa-fw"></i>
  				</span>
          <span className="btn-link v-hidden ml-2">
  					<i className="fas fa-trash-alt fa-fw"></i>
  				</span>
  			</div>
        { _urls.map(url => <div key={url.id} className="Box-row d-flex flex-items-center text-mono">
  				<i className="fas fa-bars mr-3"></i>
  				<div className="col-6">{url.route}</div>
  				<div className="col-6">{url.method}</div>
  				<div className="d-flex">
            <Link to={`/urls/${url.id}`} className="link-gray">
              <i className="fas fa-edit fa-fw"></i>
            </Link>
            <button className="link-gray btn-link ml-3" onClick={deleteOnClick(url.id)}>
              <i className="fas fa-trash-alt fa-fw"></i>
            </button>
          </div>
  			</div>) }
        { _urls.length === 0 && <div className="Box-row d-flex flex-items-center text-mono">
          <i className="fas fa-bars mr-3 v-hidden"></i>
  				<div>No results</div>
  			</div> }
  		</div>
  	</div>
  </div>;
}

const mapStateToProps = (state, oenProps) => ({
  urls: state.urls,
})

const mapDispatchToProps = dispatch => ({
  deleteRouteAction: id => dispatch(deleteRoute(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UrlsPage)
