export const filterKeyByValue = (array, key, value) => {
  let regex = new RegExp(value.trim(), 'gi');

  return array.filter(v => regex.test(v[key]));
};

export const filterKeyByValues = (array, key, values) => array.filter(v => values.indexOf(v[key].toLowerCase()) > -1);

export const getTrueKeys = object => Object.entries(object).filter(v => v[1]).map(v => v[0])
