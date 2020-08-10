/* eslint-disable jsx-a11y/href-no-hash */
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const getServerConfig = require('../webpack/webpack.server.config');
const getClientConfig = require('../webpack/webpack.client.config');

const env = 'production';
const { publicPath } = getClientConfig(env).output;
const outputPath = getClientConfig(env).output.path;

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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
        return false;
      }
    );
    return false;
  }
);
