const purgecss = require('@fullhuman/postcss-purgecss')

const sourceContent = [
    './**/*.html',
    './**/*.md',
    './**/*.js'
];

module.exports = {
    plugins: [
        // purgecss({
        //     content: sourceContent,
        //     variables: true,
        //     keyframes: true
        // }),

        'postcss-discard-comments',
        {
            'postcss-preset-env': {
                browsers: 'last 2 versions',
            },
        }
    ]
};
