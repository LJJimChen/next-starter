import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetCommonPropsConfig } from './types';

export const commonPropsConfig: GetCommonPropsConfig = {
    _nextI18Next: async (option) => {
        const ns = new Set(['common', 'nav', ...(option.localeNs ?? [])]);
        const i18n = await serverSideTranslations(option.locale ?? '', [...ns]);
        return i18n._nextI18Next;
    },
};
