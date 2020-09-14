const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.APP_ENV === 'development';

const baseFilename = isDev ? 'index' : 'index.[contenthash]';

module.exports = (env) => {
  return {
    mode:  env.production ? 'production' : 'development',
    entry: {
      // scripts
      'home_script': path.resolve(__dirname, 'src/assets/scripts/home/index.ts'),
      'id_lookup': path.resolve(__dirname, 'src/assets/scripts/id-lookup/index.ts'),
      'genetree_id_lookup': path.resolve(__dirname, 'src/assets/scripts/genetree-id-lookup/index.ts'),
      'search': path.resolve(__dirname, 'src/assets/scripts/search/index.ts'),

      // styles
      'home_styles': path.resolve(__dirname, 'src', 'assets', 'styles', 'home.scss'),
      'search_styles': path.resolve(__dirname, 'src', 'assets', 'styles', 'search.scss'),
      '404_styles': path.resolve(__dirname, 'src', 'assets', 'styles', '404.scss')
    },
    output: {
      path: path.resolve(__dirname, 'dist', 'assets'),
      filename: env.production ? `[name]-[hash].js` : `[name].js`,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  "@babel/typescript",
                  [ "@babel/preset-env",
                    {
                      "useBuiltIns": "usage",
                      "corejs": 3,
                      "targets": "> 0.25%, not dead"
                    }
                  ]
                ],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'sass-loader',
            // 'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: env.production ? `[name]-[hash].css` : `[name].css` }),
      new ManifestPlugin({ publicPath: '/assets/' })
    ],
  };
};
