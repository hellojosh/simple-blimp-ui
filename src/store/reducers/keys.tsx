export const CREATE_KEY = 'CREATE_KEY';

export const DEFAULT_STATE = [
  { id: 1, name: 'iPhone App', key: 'a5s6a6d57d889ddsd7s6dsd98', accessIds: [ 1, 2 ] }
];

function reducer (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CREATE_KEY:
      return state.concat(action.value);
    default:
      return state;
  }
}

export default reducer;
