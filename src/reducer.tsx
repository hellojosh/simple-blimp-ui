export const DELETE_URL = 'DELETE_URL';
export const REORDER_URLS = 'REORDER_URLS';
export const ADD_ROUTE = 'ADD_ROUTE';
export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const DELETE_TABLE = 'DELETE_TABLE';
export const CREATE_TABLE = 'CREATE_TABLE';
export const UPDATE_TABLE = 'UPDATE_TABLE';
export const DELETE_KEY = 'DELETE_KEY';
export const CREATE_KEY = 'CREATE_KEY';
export const UPDATE_KEY = 'UPDATE_KEY';

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

export const reducer = (state, action) => {
  switch (action.type) {
    case DELETE_URL:
      return {
        ...state,
        urls: state.urls.filter((url) => url.id !== action.id),
      };
    case REORDER_URLS: {
      const newUrls = [...state.urls];
      const [removed] = newUrls.splice(action.value.from, 1);

      newUrls.splice(action.value.to, 0, removed);

      return {
        ...state,
        urls: newUrls,
      };
    }
    case ADD_ROUTE:
      return {
        ...state,
        urls: [
          ...state.urls,
          {
            id: Math.max(...state.urls.map((url) => url.id), 0) + 1,
            ...action.value,
          },
        ],
      };
    case UPDATE_ROUTE:
      return {
        ...state,
        urls: state.urls.map((url) => {
          if (url.id === action.value.id) {
            return action.value;
          }

          return url;
        }),
      };
    case DELETE_TABLE:
      return {
        ...state,
        tables: state.tables.filter((table) => table.name !== action.name),
      };
    case CREATE_TABLE:
      return {
        ...state,
        tables: [
          ...state.tables,
          action.value,
        ],
      };
    case UPDATE_TABLE:
      return {
        ...state,
        tables: [
          ...state.tables.map((table) => {
            if (table.name.toLowerCase() === action.value.name.toLowerCase()) {
              return action.value;
            }

            return table;
          }),
        ],
      };
    case DELETE_KEY:
      return {
        ...state,
        keys: state.keys.filter((key) => key.id !== action.id),
      };
    case CREATE_KEY:
      return {
        ...state,
        keys: [
          ...state.keys,
          {
            id: Math.max(...state.keys.map((key) => key.id), 0) + 1,
            ...action.value,
          },
        ],
      };
    case UPDATE_KEY:
      return {
        ...state,
        keys: state.keys.map((key) => {
          if (key.id === action.value.id) {
            return action.value;
          }

          return key;
        }),
      };
    default:
      return state;
  }
};
