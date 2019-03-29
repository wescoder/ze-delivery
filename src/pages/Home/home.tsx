/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { ReactElement, Fragment as F, ChangeEvent } from 'react'
import { navigate } from 'hookrouter'
import { debounce } from 'ts-debounce'

export interface HomeProps {
  color?: string
  name?: string
}

const titleCss = (color: string): SerializedStyles => css({ color })

const queryApi = debounce(async (search: string): Promise<void> => {
  if (search) {
    console.log(search)
  }
}, 300)

const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
  queryApi(e.target.value)
}

export function Home({ color, name }: HomeProps): ReactElement<HomeProps> {
  return (
    <F>
      <button onClick={_e => navigate('/products')}>products</button>
      <button onClick={_e => navigate('/not-valid')}>Nope</button>
      <h1 css={titleCss(color)}>Hello, {name}!</h1>
      <input type='text' onChange={handleSearch} />
    </F>
  )
}

Home.defaultProps = {
  color: 'darkorchid',
  name: 'world',
}

export default Home
