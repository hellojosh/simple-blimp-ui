import { combineReducers } from 'redux';

import UrlsReducer from './urls';
import TablesReducer from './tables';
import KeysReducer from './keys';

export default combineReducers({
  urls: UrlsReducer,
  tables: TablesReducer,
  keys: KeysReducer,
})
