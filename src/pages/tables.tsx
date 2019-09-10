import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { filterKeyByValue } from '../utilities';
import { deleteTable } from '../store/actions/tables';

function TablesPage({ tables, deleteTableAction }) {
  const [ searchPhrase, setSearchPhrase ] = useState('');
  const searchOnChange = e => {
    setSearchPhrase(e.target.value);
  };
  const resetOnClick = () => {
    setSearchPhrase('');
  };
  const deleteOnClick = id => () => deleteTableAction(id);
  const _tables = filterKeyByValue(tables, 'name', searchPhrase);

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
        <input className="form-control flex-auto" type="text" placeholder="Find a Table..." value={searchPhrase} onChange={searchOnChange} />
        <button className="btn-link ml-3" onClick={resetOnClick}>Reset</button>
      </div>
      <div className="Box Box--condensed">
        <div className="Box-header Box-header--gray d-flex flex-items-center">
          <div className="col-12"><strong>Name</strong></div>
        </div>
        { _tables.length > 0 && _tables.map(table => <div key={table.name} className="Box-row d-flex flex-items-center text-mono">
          <div className="col-12">{table.name}</div>
          <Link to={`/tables/${table.name}`} className="link-gray">
            <i className="fas fa-edit fa-fw"></i>
          </Link>
          <button className="link-gray btn-link ml-3" onClick={deleteOnClick(table.name)}>
            <i className="fas fa-trash-alt fa-fw"></i>
          </button>
        </div>) }
        { _tables.length === 0 && <div className="Box-row d-flex flex-items-center text-mono">
          No Results
        </div> }
      </div>
    </div>
  </div>;
}

const mapStateToProps = state => ({
  tables: state.tables,
})

const mapDispatchToProps = dispatch => ({
  deleteTableAction: id => dispatch(deleteTable(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TablesPage);
