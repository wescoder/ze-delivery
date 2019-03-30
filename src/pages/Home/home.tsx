/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { navigate } from 'hookrouter'
import { ChangeEvent, Fragment as F, ReactElement, useState } from 'react'
import { debounce } from 'ts-debounce'

export interface HomeProps {
  color?: string
  name?: string
}

const titleCss = (color: string): SerializedStyles => css({ color })

const queryApi = debounce(async (search: string): Promise<void> => {
  console.log(search)
}, 500)

const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
  const value = e.target.value.trim()
  if (value) {
    queryApi(value)
  }
}

export function Home({ color, name }: HomeProps): ReactElement<HomeProps> {
  const [search, setSearch] = useState('')
  // const queryResult = useGraphQL({
  //   fetchOptionsOverride(options: { [key: string]: string }) {
  //     options.url =
  //       'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql'
  //   },
  //   operation: {
  //     query: pocSearch(),
  //     variables: {
  //       algorithm: 'NEAREST',
  //       lat: '-23.632919',
  //       long: '-46.699453',
  //       now: '2017-08-01T20:00:00.000Z',
  //     },
  //   },
  // })
  // console.log(JSON.stringify(queryResult))
  return (
    <F>
      <h1 css={titleCss(color)}>Hello, {name}!</h1>
      <button onClick={_e => navigate('/products')}>products</button>
      <button onClick={_e => navigate('/not-valid')}>Nope</button>
      <input
        value={search}
        onChange={e => setSearch(e.target.value.trim())}
        type='text'
      />
    </F>
  )
}

Home.defaultProps = {
  color: 'darkorchid',
  name: 'world',
}

export default Home
