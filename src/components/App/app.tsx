import * as React from 'react'
import { SFC, ReactElement } from 'react'
import { useRoutes } from 'hookrouter'
import { Home } from '@ze/pages/Home'
import NotFound from '@ze/pages/NotFound'
import Products from '@ze/pages/Products'

const routes = {
  '/': (): ReactElement<{}> => <Home name='Zé' />,
  '/products*': (): ReactElement<{}> => <Products />,
}

export const App: SFC<{}> = (): ReactElement<{}> =>
  useRoutes(routes) || <NotFound />

export default App
