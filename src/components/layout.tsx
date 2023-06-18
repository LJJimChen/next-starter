import { NextPage } from 'next'
import { ReactElement, ReactNode, ComponentProps } from 'react'
import React from 'react'
import Header from './header'
import Navbar from './navbar'
import Footer from './footer'

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    )
}
