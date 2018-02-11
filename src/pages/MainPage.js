import React from 'react'
import cx from 'classnames'
import LoginForm from 'components/LoginForm'
import VideoChat from 'components/VideoChat'
import styles from './MainPage.scss'

const MainPage = () => (
  <div className={cx(styles.root)}>
    <LoginForm />
    <VideoChat />
  </div>
)

export default MainPage
