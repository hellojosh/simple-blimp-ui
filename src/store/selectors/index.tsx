import { createSelector } from 'reselect';

export const getUrls = state => state.urls;

export const getTables = state => state.tables;

export const getUrlId = (_, props) => props.match.params.id;

export const getUrlName = (_, props) => props.match.params.name;

export const getUrlById = createSelector(
  [ getUrls, getUrlId ],
  (urls, id) => urls.filter(url => url.id === parseInt(id))[0]
);

export const getTableByName = createSelector(
  [ getTables, getUrlName ],
  (tables, name) => tables.filter(table => table.name === name)[0]
);
