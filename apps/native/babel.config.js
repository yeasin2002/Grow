module.exports = function (api) {
  api.cache(true);
  const plugins = [];
  try {
    // include inline-import only if it's installed in the workspace
    require.resolve('babel-plugin-inline-import');
    plugins.push(['inline-import', { extensions: ['.sql'] }]);
  } catch (e) {
    // plugin not installed — continue without it
  }

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
