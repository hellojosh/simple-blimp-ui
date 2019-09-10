import { combineReducers } from 'redux';

import UrlsReducer from './urls';
import TablesReducer from './tables';

export default combineReducers({
  urls: UrlsReducer,
  tables: TablesReducer,
})
