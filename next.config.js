module.exports = {
  webpack: config => ({
    ...config,
    node: {
      net: 'empty',
      tls: 'empty',
    }
  })
};
