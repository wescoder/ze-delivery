/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { SFC, ReactElement, Fragment as F } from 'react'
import { navigate } from 'hookrouter'

export interface HomeProps {
  color?: string
  name?: string
}

const titleCss = (color: string): SerializedStyles => css({ color })

export const Home: SFC<HomeProps> = ({
  color,
  name,
}): ReactElement<HomeProps> => {
  return (
    <F>
      <button onClick={_e => navigate('/products')}>products</button>
      <button onClick={_e => navigate('/not-valid')}>Nope</button>
      <h1 css={titleCss(color)}>Hello, {name}!</h1>
    </F>
  )
}

Home.defaultProps = {
  color: 'darkorchid',
  name: 'world',
}

export default Home
