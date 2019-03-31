/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { mapsLoading } from '@ze/index'
import { pocSearchQuery } from '@ze/pages/Home/queries'
import { useGraphQL } from 'graphql-react'
import { Fragment as F, ReactElement, useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'

const { GRAPHQL_API_ENDPOINT } = process.env

export interface HomeProps {
  color?: string
  name?: string
}

const titleCss = (color: string): SerializedStyles => css({ color })

interface PocResponse {
  data: { pocSearch: any }
}

export function Home({ color, name }: HomeProps): ReactElement<HomeProps> {
  const [address, setAddress] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [isMapsLoaded, setMapsLoaded] = useState(false)

  useEffect(() => {
    mapsLoading.then(() => setMapsLoaded(true))
  }, [])

  const { load: loadQuery, cacheValue: response, loading: loadingQuery } = useGraphQL<PocResponse>({
    fetchOptionsOverride(options) {
      options.url = GRAPHQL_API_ENDPOINT
    },
    loadOnMount: false,
    operation: {
      query: pocSearchQuery,
      variables: {
        algorithm: 'NEAREST',
        lat,
        long: lng,
        now: new Date().toISOString(),
      },
    },
  })

  const searchResult = response && response.data && response.data

  const handleSelectPlace = (location: string, locationId: string): void => {
    setAddress(location)
    geocodeByPlaceId(locationId).then(([id]: [string]) =>
      getLatLng(id).then(({ lat, lng }: { lat: number; lng: number }) => {
        setLat(lat.toString())
        setLng(lng.toString())
      }),
    )
  }

  return (
    <F>
      <h1 css={titleCss(color)}>Hello, {name}!</h1>
      {isMapsLoaded && (
        <PlacesAutocomplete
          highlightFirstSuggestion={true}
          onChange={setAddress}
          onSelect={handleSelectPlace}
          searchOptions={{}}
          value={address}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }: {
            getInputProps: any
            suggestions: any
            getSuggestionItemProps: any
            loading: boolean
          }) => (
            <F>
              <input
                {...getInputProps({
                  className: 'location-search-input',
                  placeholder: 'Search Places ...',
                })}
              />
              <div className='autocomplete-dropdown-container'>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion: any) => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={Math.random()}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </F>
          )}
        </PlacesAutocomplete>
      )}
      <pre>lat: {lat}</pre>
      <pre>lng: {lng}</pre>
      {address ? (
        loadingQuery ? (
          <strong>Loading...</strong>
        ) : (
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        )
      ) : (
        'Type your location'
      )}
    </F>
  )
}

Home.defaultProps = {
  color: 'darkorchid',
  name: 'world',
}

export default Home
