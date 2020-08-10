module.exports = {
  apps: [
    {
      name: 'hnews',
      script: 'server/deploy.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      combine_logs: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
