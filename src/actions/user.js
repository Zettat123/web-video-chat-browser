/**
 * @see https://github.com/Zettat123/web-video-chat-browser/issues/1
 */
import { createAction } from 'redux-actions'

export const LOGIN = 'APP/LOGIN'
export const login = createAction(LOGIN, userId => userId)

export const READY = 'APP/READY'
export const ready = createAction(READY, () => true)
