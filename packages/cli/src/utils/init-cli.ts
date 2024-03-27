import welcome from 'cli-welcome';

const pkgJSON = {
  name: 'react-native-themed-styled-system-cli',
  version: '0.0.4',
  description: 'Generate theme typings for autocomplete',
  type: 'module',
  main: 'dist/cjs/index.cjs',
  module: 'dist/esm/index.mjs',
  types: 'dist/types/index.d.ts',
  scripts: {
    'build': 'rm -rf dist && tsup src --format esm --shims && yarn pack',
    'check:type': 'tsc --noEmit',
  },
  dependencies: {
    'bundle-n-require': '^1.0.1',
    'chokidar': '^3.5.3',
    'cli-welcome': '^2.2.2',
    'commander': '^11.0.0',
    'ora': '^7.0.1',
    'prettier': '^3.0.2',
    'update-notifier': '^6.0.2',
  },
  files: ['dist', 'bin'],
  bin: 'bin/index.js',
  devDependencies: {
    '@types/ora': '^3.2.0',
    '@types/update-notifier': '6.0.4',
    'tsup': '^8.0.2',
    'typescript': '5.2.2',
  },
  packageManager: 'yarn@4.1.1',
};

export async function initCLI() {
  const { default: updateNotifier } = await import('update-notifier');

  welcome({
    title: 'React Native Styled System CLI',
    tagLine: 'by MJStudio',
    bgColor: '#319795',
    color: '#FFFFFF',
    bold: true,
    clear: false,
  });

  updateNotifier({
    pkg: pkgJSON,
    shouldNotifyInNpmScript: true,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 3, // 3 days
  }).notify({ isGlobal: true, message: 'New version of CLI available' });
}
