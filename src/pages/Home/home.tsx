/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { mapsLoading } from '@ze/index'
import { pocSearchQuery } from '@ze/pages/Home/queries'
import { useManualQuery } from 'graphql-hooks'
import { Fragment as F, ReactElement, useEffect, useState } from 'react'
import PlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'

export interface HomeProps {
  color?: string
  name?: string
}

const titleCss = (color: string): SerializedStyles => css({ color })

interface PocResponse {
  data: { pocSearch: any }
}

const useMapsLoaded = (): boolean => {
  const [isMapsLoaded, setMapsLoaded] = useState(false)

  useEffect(() => {
    mapsLoading.then(() => setMapsLoaded(true))
  }, [])

  return isMapsLoaded
}

export function Home({ color, name }: HomeProps): ReactElement<HomeProps> {
  const [address, setAddress] = useState('')
  const isMapsLoaded = useMapsLoaded()

  const [fetchQuery, { data: searchResult, loading: loadingQuery }] = useManualQuery(pocSearchQuery)

  const pocResult: any[] = searchResult && searchResult.pocSearch

  const getPoc = async (locationId: string): Promise<{ lat: number; lng: number }> => {
    const [id]: [string] = await geocodeByPlaceId(locationId)
    return getLatLng(id)
  }

  const handleSelectPlace = async (location: string, locationId: string): Promise<void> => {
    setAddress(location)
    const { lat, lng } = await getPoc(locationId)
    fetchQuery({
      variables: {
        algorithm: 'NEAREST',
        lat: lat.toString(),
        long: lng.toString(),
        now: new Date().toISOString(),
      },
    })
  }

  return (
    <F>
      <h1 css={titleCss(color)}>Hello, {name}!</h1>
      {isMapsLoaded ? (
        <F>
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
                    placeholder: 'Search Places...',
                  })}
                />
                <div className='autocomplete-dropdown-container'>
                  {loading && <div>Loading search...</div>}
                  {suggestions.map((suggestion: any) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
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
          {address ? (
            loadingQuery ? (
              <strong>Loading result...</strong>
            ) : (
              pocResult && pocResult.map(result => <pre key={result.id}>{JSON.stringify(result, null, 2)}</pre>)
            )
          ) : (
            'Type your location'
          )}{' '}
        </F>
      ) : (
        'Loading maps'
      )}
    </F>
  )
}

Home.defaultProps = {
  color: 'darkorchid',
  name: 'world',
}

export default Home
