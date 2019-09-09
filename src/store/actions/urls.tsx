import store from '../';

export const ADD_ROUTE = 'ADD_ROUTE';
export const DELETE_ROUTE = 'DELETE_ROUTE';
export const UPDATE_ROUTE = 'UPDATE_ROUTE';

export const addRoute = (route, method, sql) => ({
  type: ADD_ROUTE,
  value: {
    id: Math.max(...store.getState().urls.map(v => v.id)) + 1,
    route,
    method,
    sql,
  }
})

export const deleteRoute = id => ({
  type: DELETE_ROUTE,
  value: id,
})

export const updateRoute = (id, route, method, sql) => ({
  type: UPDATE_ROUTE,
  value: { id, route, method, sql },
})
