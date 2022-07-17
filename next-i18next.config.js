/** @type {import('next-i18next').UserConfig} */
module.exports = {
  appendNamespaceToMissingKey: true,
  debug: process.env.NODE_ENV === 'development',
  defaultNS: 'common',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
}
