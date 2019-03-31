import { A } from 'hookrouter'
import * as React from 'react'
import { ReactElement } from 'react'

export function Header(): ReactElement<{}> {
  return (
    <header>
      <A href='/'>Home</A>
      <A href='/products'>Produtos</A>
    </header>
  )
}

export default Header
