const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig, MetroConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/private/defaults/exclusionList').default;

const packages = [
  {
    name: 'core',
    pak: require('../packages/core/package.json'),
  },
  {
    name: 'util',
    pak: require('../packages/util/package.json'),
  },
];

const root = path.resolve(__dirname, '..');

const excludedModules = [...packages.flatMap((p) => Object.keys(p.pak.peerDependencies || {}))];

const defaultConfig = getDefaultConfig(__dirname);

const extraNodeModulePath = (name, fromRoot) =>
  fromRoot
    ? path.join(__dirname, '../node_modules', name)
    : path.join(__dirname, 'node_modules', name);

const extraNodeModules = excludedModules.reduce((acc, name) => {
  acc[name] = extraNodeModulePath(name, false);

  return acc;
}, {});

const blockList = exclusionList(
  excludedModules.map((m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)),
);

/** @type {import('@expo/metro-config').MetroConfig} */
module.exports = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    ...defaultConfig.resolver,

    blockList,
    extraNodeModules,
  },
};
