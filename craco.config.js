const cracoModuleFederation = require('craco-module-federation');

module.exports = {
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      'react/jsx-runtime': 'react/jsx-runtime.js',
    },
  },
};
