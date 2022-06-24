const path = require('path');

module.exports = (env = {}) => {
    const getStyleLoaders = (preProcessor) => {
        const loaders = [
            { loader: 'style-loader' },
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[name]-[hash:base64:6]',
                    },
                },
            },
            { loader: 'postcss-loader' },
        ];

        if (preProcessor) {
            loaders.push(
                { loader: 'resolve-url-loader' },
                { loader: preProcessor },
            );
        }

        return loaders;
    };

    return {
        mode: 'production',

        entry: './src/index.ts',

        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'build'),
            filename: 'index.js',
            library: 'react-lib',
            libraryTarget: 'commonjs2',
        },

        externals: {
            react: 'commonjs react',
            'react-dom': 'commonjs react-dom',
            'react-router': 'commonjs react-router',
            'react-router-dom': 'commonjs react-router-dom',
            'redux-form': 'commonjs redux-form',
            'react-redux': 'commonjs react-redux',
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ['ts-loader'],
                },
                {
                    test: /\.(css)$/,
                    use: getStyleLoaders(),
                },
                {
                    test: /\.(scss)$/,
                    use: getStyleLoaders('sass-loader'),
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],

            alias: {
                '@assets': path.resolve(__dirname, './src/assets'),
                '@components': path.resolve(__dirname, './src/components'),
                '@helpers': path.resolve(__dirname, './src/helpers'),
                '@utils': path.resolve(__dirname, './src/utils'),
            },
        },
    };
};
