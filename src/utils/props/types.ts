import { SSRConfig } from 'next-i18next';

export type CommonPropsOption = {
    locale?: string;
    localeNs?: string[];
};

export type CommonProps = {
    _nextI18Next: SSRConfig['_nextI18Next'];
};

export type GetCommonPropsConfig = {
    [P in keyof CommonProps]: (
        option: CommonPropsOption
    ) => Promise<CommonProps[P]>;
};
