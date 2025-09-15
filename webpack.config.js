const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.APP_ENV === 'development';

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
      'home_styles': path.resolve(__dirname, 'src', 'assets', 'styles', 'home.css'),
      'search_styles': path.resolve(__dirname, 'src', 'assets', 'styles', 'search.css'),
      '404_styles': path.resolve(__dirname, 'src', 'assets', 'styles', '404.css')
    },
    output: {
      path: path.resolve(__dirname, 'dist', 'assets'),
      filename: env.production ? `[name]-[contenthash].js` : `[name].js`,
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
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            // 'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    devtool: env.production ? 'source-map' : 'eval-cheap-module-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: env.production ? `[name]-[contenthash].css` : `[name].css` }),
      new WebpackManifestPlugin({ publicPath: '/assets/' })
    ],
  };
};
