import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Layout, { NextPageWithLayout } from '../components/layout'
import { ReactElement, ReactNode } from 'react'

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? getDefaultLayout
    return <>{getLayout(<Component {...pageProps} />)}</>
}

function getDefaultLayout(page: ReactElement): ReactNode {
    return <Layout>{page}</Layout>
}

export default appWithTranslation(MyApp)
