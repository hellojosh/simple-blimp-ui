import { DELETE_TABLE, CREATE_TABLE, UPDATE_TABLE } from './actionTypes';

export default function tablesReducer(state, action) {
  switch (action.type) {
    case DELETE_TABLE:
      return state.filter((table) => table.name !== action.name);
    case CREATE_TABLE:
      return [
        ...state,
        action.value,
      ];
    case UPDATE_TABLE:
      return [
        ...state.map((table) => {
          if (table.name.toLowerCase() === action.value.name.toLowerCase()) {
            return action.value;
          }

          return table;
        }),
      ];
    default:
      return state;
  }
}
