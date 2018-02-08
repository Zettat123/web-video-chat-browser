import React from 'react'
import { Provider } from 'react-redux'
import generateConfiguredStore from 'app/store'
import Routes, { history } from 'app/routes'

const initialState = {}
const store = generateConfiguredStore(initialState, history)

const App = () => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
)

export default App
