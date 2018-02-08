/**
 * @see https://github.com/Zettat123/web-video-chat-browser/issues/1
 */
import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import { LOGIN, READY } from 'actions/user'

const initialState = fromJS({
  userId: null,
  isReady: false,
})

export default handleActions(
  {
    [LOGIN]: (state, { payload: data }) => state.set('userId', fromJS(data)),
    [READY]: (state, { payload: data }) => state.set('isReady', fromJS(data)),
  },
  initialState
)
