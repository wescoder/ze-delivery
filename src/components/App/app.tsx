import { NotFound } from '@ze/pages/NotFound'
import { routes } from '@ze/pages/routes'
import { GraphQL, GraphQLContext } from 'graphql-react'
import { useRoutes } from 'hookrouter'
import * as React from 'react'
import { ReactElement } from 'react'

const graphql = new GraphQL()

export function App(): ReactElement<{}> {
  return (
    <GraphQLContext.Provider value={graphql}>
      {useRoutes(routes) || <NotFound />}
    </GraphQLContext.Provider>
  )
}

export default App
