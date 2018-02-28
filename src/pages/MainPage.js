import React from 'react'
import cx from 'classnames'
import { Alert } from 'antd'
import LoginForm from 'components/LoginForm'
import VideoChat from 'components/VideoChat'
import styles from './MainPage.scss'

// @see https://github.com/Zettat123/web-video-chat-browser/issues/10
const compatible = navigator.vendor.startsWith('Google')

const MainPage = () => (
  <div className={cx(styles.root)}>
    {compatible ? (
      <div />
    ) : (
      <Alert
        className={styles.alert}
        message="Warning"
        // eslint-disable-next-line max-len
        description="Some bugs may occur on this browser. Please run this app on Chrome 53.0+"
        type="warning"
        closeText="Close Now"
        banner
      />
    )}
    <LoginForm />
    <VideoChat />
  </div>
)

export default MainPage
