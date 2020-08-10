const ENV_TYPES = {
  PROD: 'prod',
  STAG: 'stag',
  LOCAL: 'local',
};

// For staging Environments
const STAG_ENV = {
  // URL: 'API URL',
  // env: 'Environment name',
};

// For Production Environments
const PROD_ENV = {};

// For Local Environments
const LOCAL_ENV = {};

const COMMON_ENV = {
  // Add here if there is any `COMMON ENVIRONMENT VARIABLES`
  URL: 'https://hn.algolia.com/api/v1/',
};

const appEnv = process.env.REACT_APP_ENV;

// eslint-disable-next-line import/no-mutable-exports
let ENV = {};

switch (appEnv) {
  case ENV_TYPES.PROD:
    ENV = { ...PROD_ENV, ...COMMON_ENV };
    break;

  case ENV_TYPES.STAG:
    ENV = { ...STAG_ENV, ...COMMON_ENV };
    break;

  case ENV_TYPES.LOCAL:
    ENV = { ...LOCAL_ENV, ...COMMON_ENV };
    break;

  default:
    ENV = { ...STAG_ENV, ...COMMON_ENV };
    break;
}

export default ENV;
