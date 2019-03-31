import Header from '@ze/components/Header'
import * as React from 'react'
import { Fragment as F, ReactElement, ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): ReactElement<LayoutProps> {
  return (
    <F>
      <Header />
      {children}
    </F>
  )
}

export default Layout
