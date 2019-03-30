/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { useGraphQL } from 'graphql-react'
import { navigate } from 'hookrouter'
import { Fragment as F, ReactElement, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { pocSearchQuery } from './queries'

export interface HomeProps {
  color?: string
  name?: string
}

const titleCss = (color: string): SerializedStyles => css({ color })

// const usePocSearch = (): any => {
//   const [cacheValue] = useDebounce(queryResult.cacheValue, 500)
//   console.log({ cacheValue })
//   return cacheValue
// }

export function Home({ color, name }: HomeProps): ReactElement<HomeProps> {
  const [search, setSearch] = useState('')

  const { load: loadQuery, cacheValue: response } = useGraphQL({
    fetchOptionsOverride(options) {
      options.url =
        'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql'
    },
    loadOnMount: false,
    operation: {
      query: pocSearchQuery(),
      variables: {
        algorithm: 'NEAREST',
        lat: '-23.632919',
        long: '-46.699453',
        now: '2017-08-01T20:00:00.000Z',
      },
    },
  })

  const [debouncedSearch] = useDebouncedCallback(loadQuery, 500, [response])

  const handleSearch = (value: string): void => {
    setSearch(value)
    if (value) {
      debouncedSearch()
    }
  }

  return (
    <F>
      <h1 css={titleCss(color)}>Hello, {name}!</h1>
      <button onClick={_e => navigate('/products')}>products</button>
      <button onClick={_e => navigate('/not-valid')}>Nope</button>
      <input
        value={search}
        onChange={e => handleSearch(e.target.value.trim())}
        type='text'
      />
      <pre>{JSON.stringify(response)}</pre>
    </F>
  )
}

Home.defaultProps = {
  color: 'darkorchid',
  name: 'world',
}

export default Home
