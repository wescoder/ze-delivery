import * as React from 'react'
import { ReactElement } from 'react'

import { Home } from './Home'
import { Products } from './Products'

export const routes = {
  '/': (): ReactElement<{}> => <Home />,
  '/products*': (): ReactElement<{}> => <Products />,
}
