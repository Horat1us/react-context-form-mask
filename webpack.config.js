// tslint:disable
const
    path = require('path'),
    webpack = require('webpack');

const
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CircularDependencyPlugin = require('circular-dependency-plugin'),
    nodeExternals = require("webpack-node-externals");

const debug = process.env.NODE_ENV !== 'production';
const env = debug ? 'local' : 'production';

console.log("Building in " + env + " environment. Debug: " + debug.toString());

const config = {
        entry: ["./src/index.ts"],
        target: "node",
        externals: [nodeExternals()],

        output: {
            filename: 'index.js',
            path: path.resolve('./build'),
            publicPath: "/",
            library: "react-context-form-mask",
            libraryTarget: "umd",
        },

        devtool: debug ? "source-map" : false,

        resolve: {
            extensions: [".ts", ".js", ".json", ".jsx", ".tsx",],
            modules: [
                path.resolve('node_modules'),
                path.resolve('src'),
            ]
        },

        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loaders: [
                        {
                            loader: "babel-loader",
                            query: {
                                presets: [
                                    'react',
                                    ['env', {
                                        "targets": {
                                            "browsers": ["last 2 versions", "safari >= 10", "ie >= 11"]
                                        }
                                    }]
                                ],
                                "plugins": ["transform-object-rest-spread"]
                            }
                        },
                        "awesome-typescript-loader"
                    ]
                },
                {
                    test: /\.jsx?$/,
                    exclude:
                        [/node_modules/],
                    loader:
                        "babel-loader",
                    query: {
                        presets: [
                            'react',
                            ['env', {
                                "targets": {
                                    "browsers": ["last 2 versions", "safari >= 10", "ie >= 11"]
                                }
                            }]
                        ],
                        "plugins": ["transform-object-rest-spread"]
                    }
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ]
        },

        plugins: [
            new webpack.NamedModulesPlugin(),
            new CleanWebpackPlugin(path.resolve('./build')),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.NodeEnvironmentPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env)
                }
            }),
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /node_modules/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // override `exclude` and `failOnError` behavior
                // `onDetected` is called for each module that is cyclical
                onDetected({paths, compilation}) {
                    // `paths` will be an Array of the relative module paths that make up the cycle
                    compilation.errors.push(new Error(paths.join(' -> ')))
                }
            })
        ]
    };

module.exports = config;