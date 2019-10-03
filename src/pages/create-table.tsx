import React, { useState, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';

import { useStateValue } from '../state';
import { DELETE_TABLE, CREATE_TABLE, UPDATE_TABLE } from '../reducer';

interface CreateTablePageProps {
  match: object;
}

const DEFAULT_COLUMN = {
  name: '', type: '', hasNameError: false, hasTypeError: false, generated: false,
};
const DEFAULT_TABLE = { name: '', columns: [{ ...DEFAULT_COLUMN }] };

export default function CreateTablePage({ match }: CreateTablePageProps) {
  const isNewTable = useMemo(() => match.params.name === undefined, [match.params.name]);
  const [{ tables }, dispatch] = useStateValue();
  const table = useMemo(
    () => tables.find((value) => value.name.toLowerCase() === match.params.name) || DEFAULT_TABLE,
    [tables, match.params.name],
  );
  const [tableName, setTableName] = useState(table.name);
  const [tableNameHasError, setTableNameHasError] = useState(false);
  const [columns, setColumns] = useState(table.columns);
  const [goBack, setGoBack] = useState(false);

  const columnOnChange = (index, column) => ({ target: { value } }) => {
    const newColumns = [...columns];
    newColumns[index][column] = value;

    setColumns(newColumns);
  };
  const createOnClick = () => {
    setTableNameHasError(tableName.trim() === '');

    const newColumns = columns.map((column) => ({
      ...column,
      hasNameError: column.name.trim() === '',
      hasTypeError: column.type === '',
    }));

    const hasError = newColumns.some((c) => c.hasNameError || c.hasTypeError);

    if (tableName.trim() === '' || hasError) {
      setColumns(newColumns);

      return;
    }

    const strippedColumns = newColumns
      .map(({ name, type, generated }) => ({ name, type, generated }));

    if (isNewTable) {
      dispatch({ type: CREATE_TABLE, value: { name: tableName, columns: [{ name: 'id', type: 'id', generated: true }, ...strippedColumns] } });
    } else {
      dispatch({ type: UPDATE_TABLE, value: { name: tableName, columns: strippedColumns } });
    }

    setGoBack(true);
  };
  const deleteOnClick = () => {
    dispatch({ type: DELETE_TABLE, name: table.name });
    setGoBack(true);
  };

  if (goBack || (!isNewTable && table.name === '')) {
    return <Redirect to="/tables" />;
  }

  return (
    <div className="container-lg px-3 py-5">
      <div className="col-12 px-3">
        <div className="d-flex flex-items-center flex-justify-between position-relative">
          { isNewTable && <h3>Create Table</h3> }
          { !isNewTable && <h3>Edit Table</h3> }
          { !isNewTable && <button type="button" className="btn-link text-red" onClick={deleteOnClick}>Delete Table</button> }
        </div>
        <hr />
        <div className="col-6 centered">
          <input className={classnames('form-control col-12 mb-4', { 'border-red': tableNameHasError, 'text-gray-light bg-gray-light': !isNewTable })} type="text" placeholder="Table name" value={tableName} onChange={(e) => setTableName(e.target.value)} disabled={!isNewTable} />
          <h5 className="mb-2">Columns</h5>
          <div className="bg-gray rounded-2 px-4 py-3 mb-3 clearfix d-flex flex-items-center">
            <i className="fas fa-info-circle fa-lg mr-3" />
            <div>
              <strong>ID column in auto-generated</strong>
              <p className="note">This is a <strong>unique</strong> and <strong>auto-incrementing</strong> column.</p>
            </div>
          </div>
          { columns.map((column, index) => (
            <div key={column.name} className="d-flex mb-3">
              <input className={classnames('form-control col-12', { 'border-red': column.hasNameError, 'text-gray-light bg-gray-light': column.generated })} type="text" placeholder="Name" value={column.name} onChange={columnOnChange(index, 'name')} disabled={column.generated} />
              <select className={classnames('form-select ml-2', { 'border-red': column.hasTypeError, 'text-gray-light bg-gray-light': column.generated })} value={column.type} onChange={columnOnChange(index, 'type')} disabled={column.generated}>
                <option value="">Type</option>
                <option value="id">ID</option>
                <option value="text">Text</option>
                <option value="int">Int</option>
                <option value="double">Double</option>
              </select>
              { columns.length > 1 && (
              <button type="button" className={classnames('btn btn-danger ml-2', { 'v-hidden': column.generated })} onClick={() => setColumns(columns.filter((v, i) => i !== index))} disabled={column.generated}>
                <i className="fas fa-trash-alt" />
              </button>
              ) }
            </div>
          )) }
          <div>
            <button type="button" className="btn btn-outline mb-6" onClick={() => setColumns(columns.concat({ ...DEFAULT_COLUMN }))}>Add Column</button>
          </div>
          <div className="d-flex flex-items-center flex-justify-between mb-3">
            <div>
              <button type="button" className="btn btn-primary mr-4" onClick={createOnClick}>
                { isNewTable && <>Create</> }
                { !isNewTable && <>Update</> }
              </button>
              <button type="button" className="btn-link text-red" onClick={() => setGoBack(true)}>Cancel</button>
            </div>
            <span className="note ml-auto">All fields are required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
