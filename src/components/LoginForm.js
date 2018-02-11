/**
 * @see https://github.com/Zettat123/web-video-chat-browser/issues/1
 */
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { login } from 'actions/user'
import { selectUserId } from 'selectors/user'
import propsToImmutable from 'hocs/propsToImmutable'
import styles from './LoginForm.scss'

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
    const { userId } = this.props

    return (
      <div className={styles.root}>
        Your id is <span className={styles.id}>{userId}</span>
      </div>
    )
  }
}

export default compose(
  connect(
    state => ({
      userId: selectUserId(state),
    }),
    {
      login,
    }
  ),
  propsToImmutable
)(LoginForm)
