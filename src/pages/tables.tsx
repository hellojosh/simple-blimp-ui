import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { filterKeyByValue } from '../utilities';

import { useStateValue } from '../state';
import { DELETE_TABLE } from '../reducer';

export default function TablesPage() {
  const [{ tables }, dispatch] = useStateValue();
  const [searchPhrase, setSearchPhrase] = useState('');

  const filteredTables = useMemo(() => filterKeyByValue(tables, 'name', searchPhrase), [tables, searchPhrase]);

  return (
    <div className="container-lg px-3 py-5">
      <div className="col-12 px-3">
        <div className="d-flex flex-items-center">
          <h3 className="flex-auto">Tables</h3>
          <Link to="/tables/create" className="link-gray">
            <i className="fas fa-plus" />
          </Link>
        </div>
        <hr />
        <div className="d-flex flex-items-center mb-3">
          <input className="form-control flex-auto" type="text" placeholder="Find a table..." value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} />
          <button type="button" className="btn-link ml-3" onClick={() => setSearchPhrase('')}>Reset</button>
        </div>
        <div className="Box Box--condensed">
          <div className="Box-header Box-header--gray d-flex flex-items-center">
            <div className="col-12"><strong>Name</strong></div>
          </div>
          { filteredTables.map((table) => (
            <div key={table.name} className="Box-row d-flex flex-items-center text-mono">
              <div className="col-12">{table.name}</div>
              <Link to={`/tables/${table.name}`} className="link-gray">
                <i className="fas fa-edit fa-fw" />
              </Link>
              <button type="button" className="link-gray btn-link ml-3" onClick={() => dispatch({ type: DELETE_TABLE, name: table.name })}>
                <i className="fas fa-trash-alt fa-fw" />
              </button>
            </div>
          )) }
          { filteredTables.length === 0 && (
          <div className="Box-row d-flex flex-items-center text-mono">
          No Results
          </div>
          ) }
        </div>
      </div>
    </div>
  );
}
