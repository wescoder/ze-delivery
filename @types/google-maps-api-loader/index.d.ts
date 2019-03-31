interface Options {
  libraries?: string[]
  apiKey: string
  client?: any
  language?: string
  version?: string
}

declare function googleMapsApiLoader(params: Options): Promise<void>

declare module 'google-maps-api-loader'
