import { CREATE_TABLE, DELETE_TABLE, UPDATE_TABLE } from '../actions/tables';

const DEFAULT_STATE = [
  { name: 'accounts', columns: [{ name: 'id', type: 'id', generated: true }, { name: 'full_name', type: 'text', generated: false }] },
  { name: 'products', columns: [{ name: 'id', type: 'id', generated: true }, { name: 'full_name', type: 'text', generated: false }] },
  { name: 'transactions', columns: [{ name: 'id', type: 'id', generated: true }, { name: 'full_name', type: 'text', generated: false }] },
]

function reducer (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CREATE_TABLE:
      return state.concat(action.value);
    case DELETE_TABLE:
      return state.filter(v => v.name !== action.value);
    case UPDATE_TABLE:
      return state.map(v => {
        if (v.name === action.value.name) {
          return action.value;
        }

        return v;
      });
    default:
      return state;
  }
}

export default reducer;
