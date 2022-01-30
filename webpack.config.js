const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ENV_PROD = false;

module.exports = {
  mode: ENV_PROD ? 'production': 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, ENV_PROD ? 'dist' : 'dist-dev'),
    filename: (ENV_PROD ? '[name].bundle.min.js' : '[name].bundle.js'),
    chunkFilename: (ENV_PROD ? '[name].bundle.min.js' : '[name].bundle.js'),
    libraryTarget: 'window'
  },

  // solve problem with reloading page
  devServer: {
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ]
          }
        }
      },
      {
        // Rules for SCSS files. Loaders run in reverse order
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !ENV_PROD,
            }
          }
        ],
      },
    ]
  },

  stats: {
    colors: true
  },

  devtool: ENV_PROD ? undefined : 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
        },
      },
    },

    minimizer: []
  },
  plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: ENV_PROD ? '[name].bundle.min.css' : '[name].bundle.css',
        chunkFilename: ENV_PROD ? '[id].min.css' : '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
  ],
};
