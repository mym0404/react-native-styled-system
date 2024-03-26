const path = require('path');

const packages = [
  {
    name: 'core',
    pak: require('../packages/core/package.json'),
  },
];

const alias = {
  ...Object.fromEntries(
    packages.map(({ name, pak }) => [
      pak.name,
      path.join(__dirname, '..', 'packages', name, pak.source),
    ]),
  ),
};

module.exports = function (api) {
  api.cache(false);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          // For development, we want to alias the library to the source
          alias,
        },
      ],
    ],
  };
};
