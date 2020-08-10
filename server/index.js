/* eslint-disable jsx-a11y/href-no-hash */
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const getServerConfig = require('../webpack/webpack.server.config');
const getClientConfig = require('../webpack/webpack.client.config');

const DEV = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const env = isProduction ? 'production' : 'development';

const { publicPath } = getClientConfig(env).output;
const outputPath = getClientConfig(env).output.path;
const PORT = process.env.PORT || 4004;

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let isBuilt = false;
const done = () =>
  !isBuilt &&
  app.listen(PORT, () => {
    isBuilt = true;
    // eslint-disable-next-line no-console
    console.log(
      `:::::::: Portfolio is runnig at http://localhost:${PORT} ::::::::`
    );
  });

if (DEV) {
  const compiler = webpack([
    getClientConfig('development'),
    getServerConfig('development'),
  ]);
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath, stats: { colors: true } };
  const devMiddleware = webpackDevMiddleware(compiler, options);
  app.use(devMiddleware);
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));
  devMiddleware.waitUntilValid(done);
} else {
  webpack([getClientConfig('production'), getServerConfig('production')]).run(
    (err, stats) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(':::::::: Error ocurred ::::::::', err);
        return false;
      }
      const clientStats = stats.toJson().children[0];

      fs.writeFile(
        `${process.cwd()}/build/clientstats.json`,
        JSON.stringify(clientStats),
        'utf8',
        error => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
          // eslint-disable-next-line global-require
          const serverRender = require('../compiledServer/main.js').default;
          app.use(publicPath, express.static(outputPath));
          app.use(serverRender({ clientStats }));
          done();
          return false;
        }
      );
      return false;
    }
  );
}
