/** @jsx jsx */
import { SFC, ReactElement } from 'react'
import { css, jsx, SerializedStyles } from '@emotion/core'

interface AppProps {
  color?: string
  name?: string
}

const titleCss = (color: string): SerializedStyles => css({ color })

export const App: SFC<AppProps> = ({ color, name }): ReactElement<AppProps> => (
  <h1 css={titleCss(color)}>Hello, {name}!</h1>
)

App.defaultProps = {
  color: 'hotpink',
  name: 'world',
}

export default App
