import { combineReducers } from 'redux'

import UrlsReducer from './urls';

export default combineReducers({ urls: UrlsReducer })
