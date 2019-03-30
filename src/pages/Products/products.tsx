import * as React from 'react'
import { Fragment as F, ReactElement } from 'react'

export function Products(): ReactElement<{}> {
  return (
    <F>
      <h1>Products</h1>
      <button onClick={() => window.history.back()}>&lt;</button>
    </F>
  )
}

export default Products
