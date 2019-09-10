import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import classnames from 'classnames';

import { getTableByName } from '../store/selectors';
import { createTable, deleteTable, updateTable } from '../store/actions/tables';

const DEFAULT_COLUMN = { name: '', type: '', hasNameError: false, hasTypeError: false, generated: false };
const DEFAULT_TABLE = { name: '', columns: [{ ...DEFAULT_COLUMN }] };

function CreateTablePage({ match, table = DEFAULT_TABLE, createTableAction, deleteTableAction, updateTableAction }) {
  const isNewTable = match.params.name === undefined;
  const [ tableName, setTableName ] = useState(table.name);
  const [ tableNameHasError, setTableNameHasError ] = useState(false);
  const [ columns, setColumns ] = useState(table.columns);
  const [ goBack, setGoBack ] = useState(false);
  const tableNameOnChange = e => setTableName(e.target.value);
  const addColumnOnClick = () => setColumns(columns.concat({ ...DEFAULT_COLUMN }));
  const deleteColumnOnClick = index => () => setColumns(columns.filter((v, i) => i !== index));
  const columnOnChange = (index, column) => ({ target: { value }}) => {
    const newColumns = columns.map((v, i) => {
      if (i !== index) {
        return v;
      }

      return { ...v, [column]: value };
    });

    setColumns(newColumns);
  };
  const createOnClick = () => {
    let failed = tableName.trim() === '';

    setTableNameHasError(tableName.trim() === '');

    let newColumns = columns.map(column => {
      column.hasNameError = column.name.trim() === '';
      column.hasTypeError = column.type === '';

      if (column.hasNameError || column.hasTypeError) {
        failed = true;
      }

      return column;
    });

    if (failed) {
      setColumns(newColumns);

      return;
    }

    newColumns = newColumns.map(({ name, type }) => ({ name, type }));
    newColumns.unshift({ name: 'id', type: 'id', generated: true });

    if (isNewTable) {
      createTableAction(tableName, newColumns);
    } else {
      updateTableAction(tableName, newColumns);
    }

    setGoBack(true);
  };
  const deleteOnClick = () => {
    deleteTableAction(table.name);
    setGoBack(true);
  };

  if (goBack) {
    return <Redirect to="/tables" />
  }

  return <div className="container-lg px-3 py-5">
    <div className="col-12 px-3">
      <div className="d-flex flex-items-center flex-justify-between position-relative">
        { isNewTable && <h3>Create Table</h3> }
        { !isNewTable && <h3>Edit Table</h3> }
        { !isNewTable && <button className="btn-link text-red" onClick={deleteOnClick}>Delete Table</button> }
      </div>
      <hr />
      <div className="col-6 centered">
        <input className={classnames('form-control col-12 mb-4 input-contrast', { 'border-red': tableNameHasError })} type="text" placeholder="Table name" value={tableName} onChange={tableNameOnChange} disabled={!isNewTable} />
        <h5 className="mb-2">Columns</h5>
        <div className="bg-gray rounded-2 px-4 py-3 mb-3 clearfix d-flex flex-items-center">
          <i className="fas fa-info-circle fa-lg mr-3"></i>
          <div>
            <strong>ID column in auto-generated</strong>
            <p className="note">This is a <strong>unique</strong> and <strong>auto-incrementing</strong> column.</p>
          </div>
        </div>
        { columns.map((column, index) => <div key={index} className="d-flex mb-3">
          <input className={classnames('form-control col-12 input-contrast', { 'border-red': column.hasNameError })} type="text" placeholder="Name" value={column.name} onChange={columnOnChange(index, 'name')} disabled={column.generated} />
          <select className={classnames('form-select ml-2', { 'border-red': column.hasTypeError })} value={column.type} onChange={columnOnChange(index, 'type')} disabled={column.generated}>
            <option value="">Type</option>
            <option value="id">ID</option>
            <option value="text">Text</option>
            <option value="int">Int</option>
            <option value="double">Double</option>
          </select>
          { columns.length > 1 && <button className={classnames('btn btn-danger ml-2', { 'v-hidden': column.generated })} onClick={deleteColumnOnClick(index)} disabled={column.generated}>
            <i className="fas fa-trash-alt"></i>
          </button> }
        </div>) }
        <div>
          <button className="btn btn-outline mb-6" onClick={addColumnOnClick}>Add Column</button>
        </div>
        <div className="d-flex flex-items-center flex-justify-between mb-3">
          <button className="btn btn-primary" onClick={createOnClick}>
            { isNewTable && <Fragment>Create</Fragment> }
            { !isNewTable && <Fragment>Update</Fragment> }
          </button>
          <span className="note">All fields are required</span>
        </div>
      </div>
    </div>
  </div>;
}

const mapStateToProps = (state, props) => ({
  table: getTableByName(state, props),
});

const mapDispatchToProps = dispatch => ({
  createTableAction: (name, columns) => dispatch(createTable(name, columns)),
  deleteTableAction: id => dispatch(deleteTable(id)),
  updateTableAction: (name, columns) => dispatch(updateTable(name, columns)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTablePage);
