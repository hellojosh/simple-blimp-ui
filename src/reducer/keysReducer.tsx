import uuid from 'uuid/v1';

import { DELETE_KEY, CREATE_KEY, UPDATE_KEY } from './actionTypes';

export default function keysReducer(state, action) {
  switch (action.type) {
    case DELETE_KEY:
      return state.filter((key) => key.id !== action.id);
    case CREATE_KEY:
      return [
        ...state,
        {
          id: Math.max(...state.map((key) => key.id), 0) + 1,
          ...action.value,
          key: uuid(),
        },
      ];
    case UPDATE_KEY:
      return state.map((key) => {
        if (key.id === action.value.id) {
          return action.value;
        }

        return key;
      });
    default:
      return state;
  }
}
