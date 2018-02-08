import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import LoginForm from 'app/components/LoginForm'
import styles from './MainPage.scss'

const MainPage = () => (
  <div>
    <div className={cx(styles.text)}>This is MainPage</div>
    <Link to="/about">ABOUT</Link>
    <LoginForm />
  </div>
)

export default MainPage
