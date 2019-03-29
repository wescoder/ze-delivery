import * as React from 'react'
import { SFC } from 'react'

interface AppProps {
  name?: string
}

export const App: SFC<AppProps> = ({ name }) => <h1>Hello, {name}!</h1>

App.defaultProps = {
  name: 'world',
}

export default App
