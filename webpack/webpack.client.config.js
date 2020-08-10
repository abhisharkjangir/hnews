/* eslint-disable jsx-a11y/href-no-hash */
const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WriteFilePlugin = require('write-file-webpack-plugin'); // here so you can see what chunks are built
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const paths = require('./paths');

const getOutput = isProduction => {
  return {
    filename: isProduction ? 'static/js/[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction
      ? 'static/js/[name].[chunkhash].js'
      : '[name].chunk.js',
    path: isProduction
      ? path.resolve(__dirname, '../build')
      : path.resolve(__dirname, '../devBuild'),
    publicPath: '/',
  };
};

const getModule = isProduction => {
  return {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      !isProduction
        ? {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            enforce: 'pre',
            use: [
              {
                options: {
                  formatter: require.resolve('react-dev-utils/eslintFormatter'),
                  eslintPath: require.resolve('eslint'),
                  resolvePluginsRelativeTo: __dirname,
                },
                loader: require.resolve('eslint-loader'),
              },
            ],
            include: paths.appSrc,
          }
        : {},
      {
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [
              /\.bmp$/,
              /\.gif$/,
              /\.jpe?g$/,
              /\.png$/,
              /\.jpg$/,
              /\.svg$/,
              /\.ico$/,
            ],
            loader: require.resolve('url-loader'),
            options: {
              limit: '10000',
              name: 'static/assets/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: [paths.appSrc, paths.appPublic, paths.serverPath],
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),

              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                      },
                    },
                  },
                ],
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: !!isProduction,
              compact: !!isProduction,
            },
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: isProduction,

              // If an error happens in a package, it's possible to be
              // because it was compiled. Thus, we don't want the browser
              // debugger to show the original code. Instead, the code
              // being evaluated would be much more helpful.
              sourceMaps: false,
            },
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            test: [/\.pdf$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/assets/[name].[ext]',
            },
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [
              /\.(js|mjs|jsx|ts|tsx|scss|css|ico|)$/,
              /\.html$/,
              /\.json$/,
            ],
            options: {
              name: 'static/assets/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
      {
        test: /\.styl|.(scss|sass)$/,
        use: [
          isProduction ? ExtractCssChunks.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[hash:base64:5]', // To include filename -[name]-[local]-[hash:base64:5]
            },
          },
          {
            loader: 'stylus-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          isProduction ? ExtractCssChunks.loader : 'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  };
};

const getResolve = () => {
  return {
    extensions: ['.js', '.jsx', '.css', '.styl'],
  };
};

const getPlugins = isProduction => {
  if (isProduction) {
    return [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        generateStatsFile: true,
        reportFilename: 'bundlereport.html',
        statsFilename: 'bundlestats.json',
      }),

      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        disable: false, // Disable during development
        pngquant: {
          progressive: true,
          quality: '50',
        },
        jpegtran: { progressive: true },
      }),
      new ExtractCssChunks({
        filename: 'static/css/[name].[hash:8].css',
        chunkFilename: 'static/css/[name].[hash:8].css',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
      new CopyPlugin([
        { from: 'public/manifest.json', to: 'static/js' },
        { from: 'public/robots.txt', to: '' },
        { from: 'public/sitemap.xml', to: '' },
        { from: 'public/favicon.ico', to: 'static/assets' },
        { from: 'public/logo512.png', to: 'static/assets' },
        { from: 'public/logo192.png', to: 'static/assets' },
        { from: 'public/service-worker.js', to: '' },
        { from: 'public/asset-manifest.json', to: '' },
      ]),
    ];
  }
  return [
    new CopyPlugin([
      { from: 'public/manifest.json', to: 'static/js' },
      { from: 'public/robots.txt', to: '' },
      { from: 'public/sitemap.xml', to: '' },
      { from: 'public/favicon.ico', to: 'static/assets' },
      { from: 'public/logo512.png', to: 'static/assets' },
      { from: 'public/logo192.png', to: 'static/assets' },
      { from: 'public/service-worker.js', to: '' },
      { from: 'public/asset-manifest.json', to: '' },
    ]),
    new WriteFilePlugin(),
    new ExtractCssChunks(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ];
};

const getClientConfig = env => {
  const isProduction = env === 'production';
  return {
    name: 'client',
    target: 'web',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: isProduction
      ? ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
      : [
          'babel-polyfill',
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
          'react-hot-loader/patch',
          path.resolve(__dirname, '../src/index.js'),
        ],
    output: getOutput(isProduction),
    stats: 'verbose',
    mode: isProduction ? env : 'development',
    module: getModule(isProduction),
    resolve: getResolve(isProduction),
    plugins: getPlugins(isProduction),
    optimization: {
      minimize: isProduction,
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    performance: false,
  };
};
module.exports = getClientConfig;
