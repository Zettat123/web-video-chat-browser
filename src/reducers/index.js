import { combineReducers } from 'redux-immutable'
import user from './user'
import route from './route'

const createReducer = asyncReducers =>
  combineReducers({
    user,
    route,
    ...asyncReducers,
  })

export default createReducer
