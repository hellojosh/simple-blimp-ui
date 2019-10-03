export const filterKeyByValue = (array, key, value) => {
  const regex = new RegExp(value.trim(), 'gi');

  return array.filter((v) => regex.test(v[key]));
};

export const filterKeyByValues = (array, key, values) => (
  array.filter((v) => values.indexOf(v[key].toLowerCase()) > -1)
);

export const getTrueKeys = object => Object.entries(object).filter((v) => v[1]).map((v) => v[0]);

export const filterUrls = (urls = [], phrase = '', methods = {}) => {
  const selectedMethods = getTrueKeys(methods);
  let newUrls = filterKeyByValue(urls, 'route', phrase);

  if (selectedMethods.length > 0) {
    newUrls = filterKeyByValues(newUrls, 'method', selectedMethods);
  }

  return newUrls;
};
