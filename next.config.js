module.exports = {
  webpack: config => ({
    ...config,
    node: {
      child_process: 'empty',
      fs: 'empty',
    }
  })
};
