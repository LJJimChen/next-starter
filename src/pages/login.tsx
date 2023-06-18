import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { makeServerSideProps } from '../utils/props/propHelper';

export default function LoginPage({
    pageComponentProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t('item')}</h1>
            {pageComponentProps}
        </div>
    );
}

export const getServerSideProps = makeServerSideProps(
    async (ctx) => {
        return {
            props: {
                pageComponentProps: 'login pageddddddddddddd',
            },
        };
    },
    { localeNs: ['common', 'nav', 'common'] }
);
