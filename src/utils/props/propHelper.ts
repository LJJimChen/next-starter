import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetStaticProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { CommonProps, CommonPropsOption } from './types';
import { commonPropsConfig } from './config';

export function makeStaticProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
>(
    _getStaticProps: GetStaticProps<P, Q, D> | undefined = undefined,
    option: { localeNs?: string[] } = {}
) {
    const getstaticProps: GetStaticProps<P, Q, D> = async (ctx) => {
        let originResult: any;
        if (_getStaticProps) {
            originResult = await _getStaticProps(ctx);
        }
        const result = await mixCommonProps(originResult, {
            locale: ctx.locale,
            localeNs: option.localeNs,
        });
        return result;
    };
    return getstaticProps;
}

export function makeServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
>(
    _getServerSideProps: GetServerSideProps<P, Q, D> | undefined = undefined,
    option: { localeNs?: string[] } = {}
) {
    const getServerSideProps: GetServerSideProps<P, Q, D> = async (ctx) => {
        let originResult: any = {};
        if (_getServerSideProps) {
            originResult = await _getServerSideProps(ctx);
        }
        const result = await mixCommonProps(originResult, {
            locale: ctx.locale,
            localeNs: option.localeNs,
        });
        return result;
    };
    return getServerSideProps;
}

async function mixCommonProps(originResult: any, option: CommonPropsOption) {
    let commonProps = await getCommonProps(option);

    const mixResult = {
        ...originResult,
        props: { ...commonProps, ...originResult?.props },
    };
    return mixResult;
}

async function getCommonProps(
    option: CommonPropsOption = {}
): Promise<CommonProps> {
    const props: any = {};
    for (const [key, getProps] of Object.entries(commonPropsConfig)) {
        let value = await getProps(option);
        props[key] = value;
    }
    return props;
}
