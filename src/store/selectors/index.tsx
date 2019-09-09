import { createSelector } from 'reselect';

export const getUrls = state => state.urls;

export const getUrlId = (_, props) => props.match.params.id;

export const getUrlById = createSelector(
  [ getUrls, getUrlId ],
  (urls, id) => urls.filter(url => url.id === parseInt(id))[0]
);
