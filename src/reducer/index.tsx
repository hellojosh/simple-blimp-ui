import urlsReducer from './urlsReducer';
import tablesReducer from './tablesReducer';
import keysReducer from './keysReducer';

export * from './actionTypes';

export const initialState = {
  urls: [
    {
      id: 1, route: '/v1/people', method: 'GET', sql: 'SELECT * FROM people;',
    },
    {
      id: 2, route: '/v1/people', method: 'POST', sql: 'INSERT INTO people;',
    },
    {
      id: 4, route: '/v1/people/latest', method: 'GET', sql: 'SELECT TOP 5 * FROM people;',
    },
    {
      id: 3, route: '/v1/people/:id', method: 'GET', sql: 'SELECT * FROM people WHERE id = {id};',
    },
  ],
  tables: [
    { name: 'accounts', columns: [{ name: 'id', type: 'id', generated: true }, { name: 'full_name', type: 'text', generated: false }] },
    { name: 'products', columns: [{ name: 'id', type: 'id', generated: true }, { name: 'full_name', type: 'text', generated: false }] },
    { name: 'transactions', columns: [{ name: 'id', type: 'id', generated: true }, { name: 'full_name', type: 'text', generated: false }] },
  ],
  keys: [
    {
      id: 1, name: 'iPhone App', key: 'a5s6a6d57d889ddsd7s6dsd98', accessIds: [1, 2],
    },
  ],
};

export default function reducer({ urls, tables, keys }: any, action: any) {
  return {
    urls: urlsReducer(urls, action),
    tables: tablesReducer(tables, action),
    keys: keysReducer(keys, action),
  };
}
