import App from '@ze/components/App'
import * as loadGoogleMapsApi from 'google-maps-api-loader'
import * as React from 'react'
import { render } from 'react-dom'

const { GOOGLE_MAPS_API_KEY } = process.env

export const mapsLoading = loadGoogleMapsApi({
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
})

render(<App />, document.getElementById('root'))
