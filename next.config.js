const path = require('path');

module.exports = {
  images: {
    domains: ['tailwindui.com'],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
};
