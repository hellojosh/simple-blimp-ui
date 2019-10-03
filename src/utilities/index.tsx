export const getValuesForKeys = (object, keys) => Object.entries(object)
  .filter((entry) => keys.indexOf(entry[0]) > -1)
  .map(([, value]) => value);

export const filterKeyByValues = (array, key, values) => {
  const newValues = values.map((value) => value.toLowerCase());

  return array.filter((item) => newValues.indexOf(item[key].toLowerCase()) > -1);
};

export const fullSearchByKeys = (array, keys, value) => {
  const newValue = value.trim().toLowerCase();

  return array.map((item, index) => ({
    index,
    value: getValuesForKeys(item, keys).join('').toLowerCase(),
  }))
    .filter((v) => v.value.indexOf(newValue) > -1)
    .map((v) => v.index)
    .map((v) => array[v]);
};
