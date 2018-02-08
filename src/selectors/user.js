/**
 * @see https://github.com/Zettat123/web-video-chat-browser/issues/1
 */
import { createSelector } from 'reselect'

const selectUserDomain = state => state.get('user')

export const selectUserId = createSelector(selectUserDomain, user =>
  user.get('userId'))

export const selectIsReady = createSelector(selectUserDomain, user =>
  user.get('isReady'))
