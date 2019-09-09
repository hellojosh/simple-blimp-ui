import { ADD_ROUTE, DELETE_ROUTE, UPDATE_ROUTE } from '../actions/urls';

const DEFAULT_STATE = [
  { id: 1, route: '/v1/people', method: 'GET', sql: 'SELECT * FROM people;' },
  { id: 2, route: '/v1/people', method: 'POST', sql: 'INSERT INTO people;' },
  { id: 4, route: '/v1/people/latest', method: 'GET', sql: 'SELECT TOP 5 * FROM people;' },
  { id: 3, route: '/v1/people/:id', method: 'GET', sql: 'SELECT * FROM people WHERE id = {id};' },
]

function reducer (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_ROUTE:
      return [ ...state, action.value ];
    case DELETE_ROUTE:
      return state.filter(v => v.id !== action.value);
    case UPDATE_ROUTE:
      return state.map(v => {
        if (v.id === action.value.id) {
          return action.value;
        }

        return v;
      });
    default:
      return state;
  }
}

export default reducer
