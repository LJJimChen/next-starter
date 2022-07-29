import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Layout, { NextPageWithLayout } from '../components/layout';
import { ReactElement, ReactNode } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? getDefaultLayout;
    return (
        <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
    );
}

function getDefaultLayout(page: ReactElement): ReactNode {
    return <Layout>{page}</Layout>;
}

export default appWithTranslation(MyApp);
