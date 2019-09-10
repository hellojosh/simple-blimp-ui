export const CREATE_TABLE = 'CREATE_TABLE';
export const DELETE_TABLE = 'DELETE_TABLE';
export const UPDATE_TABLE = 'UPDATE_TABLE';

export const createTable = (name, columns) => ({
  type: CREATE_TABLE,
  value: { name, columns },
});

export const deleteTable = name => ({
  type: DELETE_TABLE,
  value: name,
})

export const updateTable = (name, columns) => ({
  type: UPDATE_TABLE,
  value: { name, columns },
});
