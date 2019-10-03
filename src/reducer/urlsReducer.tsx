import {
  DELETE_URL, REORDER_URLS, ADD_ROUTE, UPDATE_ROUTE,
} from './actionTypes';

export default function urlsReducer(state, action) {
  switch (action.type) {
    case DELETE_URL:
      return state.filter((url) => url.id !== action.id);
    case REORDER_URLS: {
      const newUrls = [...state];
      const [removed] = newUrls.splice(action.value.from, 1);

      newUrls.splice(action.value.to, 0, removed);

      return newUrls;
    }
    case ADD_ROUTE:
      return [
        ...state,
        {
          id: Math.max(...state.map((url) => url.id), 0) + 1,
          ...action.value,
        },
      ];
    case UPDATE_ROUTE:
      return state.map((url) => {
        if (url.id === action.value.id) {
          return action.value;
        }

        return url;
      });
    default:
      return state;
  }
}
