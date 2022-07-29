const { i18n } = require('./next-i18next.config');
const { SourceMapDevToolPlugin } = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n,
    webpack: (config, { isServer, dev }) => {
        if (!isServer && !dev) {
            const srcMapPlugin = new SourceMapDevToolPlugin({
                filename: 'sourcemap/[file].map',
            });
            srcMapPlugin.sourceMappingURLComment = false;
            config.plugins = [...config.plugins, srcMapPlugin];
        }
        return config;
    },
};

module.exports = nextConfig;
