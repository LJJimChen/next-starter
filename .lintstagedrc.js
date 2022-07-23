const path = require('path')

const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => `"${path.relative(process.cwd(), f)}"`)
        .join(' --file ')}`

const tscCheckTypes = 'tsc-files --incremental false --noEmit'
const prettierFix = 'prettier --write --ignore-unknown'
module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand, tscCheckTypes, prettierFix],
    '*.json': [prettierFix, 'eslint'],
    '*.{css,scss}': ['stylelint --fix', prettierFix],
}
