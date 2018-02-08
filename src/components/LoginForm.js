/**
 * @see https://github.com/Zettat123/web-video-chat-browser/issues/1
 */
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { login, ready } from 'actions/user'
import { selectUserId, selectIsReady } from 'selectors/user'
import propsToImmutable from 'hocs/propsToImmutable'

class LoginForm extends React.Component {
  componentWillMount() {
    const { isReady, login } = this.props

    if (!isReady) {
      const id = this.generateId()
      login(id)
    }
  }

  generateId = () =>
    Date.now()
      .toString()
      .slice(-8)

  render() {
    const { userId, isReady, ready } = this.props

    return (
      <div>
        <div>{`Your id is ${userId}`}</div>
        <button onClick={() => ready()} disabled={isReady}>
          Ready
        </button>
        {isReady ? <div>Ready</div> : <div>Not Ready</div>}
      </div>
    )
  }
}

export default compose(
  connect(
    state => ({
      userId: selectUserId(state),
      isReady: selectIsReady(state),
    }),
    {
      login,
      ready,
    }
  ),
  propsToImmutable
)(LoginForm)
