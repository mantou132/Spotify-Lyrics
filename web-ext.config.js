const api = {};

try {
  Object.assign(api, require('./apikey'));
} catch (e) {}
console.log(api);
module.exports = {
  sourceDir: 'extension',
  ignoreFiles: ['*.map'],
  artifactsDir: 'build',
  verbose: true,
  sign: {
    apiKey: api.apiKey || '',
    apiSecret: api.apiSecret || '',
  },
  build: {
    overwriteDest: true,
  },
};
