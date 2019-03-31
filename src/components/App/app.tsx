import Layout from '@ze/components/Layout'
import { NotFound } from '@ze/pages/NotFound'
import { routes } from '@ze/pages/routes'
import { ClientContext, GraphQLClient } from 'graphql-hooks'
import { useRoutes } from 'hookrouter'
import * as React from 'react'
import { ReactElement } from 'react'

const { GRAPHQL_API_ENDPOINT } = process.env

const client = new GraphQLClient({
  url: GRAPHQL_API_ENDPOINT,
})

export function App(): ReactElement<{}> {
  return (
    <ClientContext.Provider value={client}>
      <Layout>{useRoutes(routes) || <NotFound />}</Layout>
    </ClientContext.Provider>
  )
}

export default App
