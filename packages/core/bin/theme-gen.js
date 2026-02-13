#!/usr/bin/env node
/* eslint-disable max-len */
// region ZX Util
const fs = require('fs');
const path = require('path');

const filename = path.basename(__filename);
const _printTag = 'Theme Gen' || filename;

const { execFileSync } = require('child_process');

function exist(path) {
  return fs.existsSync(path);
}

function read(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

function write(p, content) {
  const dir = path.dirname(p);
  if (!exist(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return fs.writeFileSync(p, content);
}

function remove(path) {
  if (!exist(path)) {
    return;
  }

  if (fs.lstatSync(path).isDirectory()) {
    return fs.rmSync(path, { force: true, recursive: true });
  } else {
    return fs.rmSync(path, { force: true });
  }
}

function addLine(str, added, backward = false) {
  if (backward) {
    return added + '\n' + str;
  } else {
    return str + '\n' + added;
  }
}

function print(...args) {
  // eslint-disable-next-line no-console
  console.log(`\x1B[35m[${_printTag}]`, ...args, '\x1B[0m');
}

function printSuccess(...args) {
  // eslint-disable-next-line no-console
  console.log(`\x1B[32m[${_printTag}]`, ...args);
}

function printError(...args) {
  // eslint-disable-next-line no-console
  console.log(`⚠️ [${_printTag}]`, ...args);
}

function getCoreVersion() {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(read(packageJsonPath));
  const version = packageJson.version;

  if (!version) {
    throw new Error(`Cannot resolve core version from '${packageJsonPath}'`);
  }

  return version;
}

// endregion

const go = async () => {
  const source = process.argv[2];
  if (!source) {
    printError('Source path is not passed');
    process.exit(1);
  }

  print(`Generation Start, Source: ${source}`);

  const tmpFile = '.tmpThemeGen.ts';
  const outputFile =
    process.argv[3] ||
    './node_modules/@react-native-styled-system/core/lib/typescript/src/@types/ThemedTypings.d.ts';

  try {
    const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    const cliPackage = `@react-native-styled-system/cli@${getCoreVersion()}`;
    execFileSync(command, ['-y', cliPackage, 'generate', '--out', tmpFile, source], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    /**
     * export interface ThemedTypings {
     * @type {string}
     */

    let result = read(tmpFile);
    result = result.replace(
      /import.*/,
      "import type { ColorsValue, RadiiValue, SizesValue, SpaceValue } from './Token';\n",
    );
    result = result.replace(/export.*/, 'export interface ThemedTypings {');
    result = result.replace(/\/\/.*/g, '');
    result = result.replace(/\|? ?\(?string & {}\)?;/g, '');
    result = result.replaceAll('string & {}', '');

    result = result.replace(
      'space:',
      'space: (SpaceValue & {}) | (`${number}` & {}) | (`${any}px` & {}) | ',
    );

    result = result.replace(
      'sizes:',
      'sizes: (SizesValue & {}) | (`${number}` & {}) | (`${any}px` & {}) | ',
    );

    result = result.replace(
      'radii:',
      'radii: (RadiiValue & {}) | (`${number}` & {}) | (`${any}px` & {}) | ',
    );

    result = result.replace('colors:', 'colors: (ColorsValue & {}) | ');
    result = result.replace(/typography:\W*?\n/, 'typography: (string & {});');

    result = result.replace(/\|[\s ]*\n/g, ';');

    write(tmpFile, result);
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.renameSync(tmpFile, outputFile);
    // await fixLint(outputFile);
    printSuccess(`🎉 Theme Typing Generated in '${outputFile}'`);
  } catch (e) {
    printError(e);
    remove(tmpFile);
  }
};
go();
