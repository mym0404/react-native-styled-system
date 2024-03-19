#!/usr/bin/env zx
/* eslint-disable max-len */
// region ZX Util
import fs from 'fs-extra';

const join = path.join;
const filename = path.basename(__filename);
const _printTag = 'Theme Gen' || filename;
// $.verbose = false;

function exist(path) {
  return fs.existsSync(path);
}

function isDir(path) {
  return exist(path) && fs.lstatSync(path).isDirectory();
}

function isFile(path) {
  return exist(path) && fs.lstatSync(path).isFile();
}

async function iterateDir(path, fn) {
  if (!isDir(path)) {
    return;
  }

  for (const file of fs.readdirSync(path)) {
    await fn(file);
  }
}

function read(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}

// you should require when possible(optimized in js)
function readJsonSlow(path) {
  return fs.readJSONSync(path);
}

function write(p, content) {
  const dir = path.dirname(p);
  if (!exist(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return fs.writeFileSync(p, content);
}

function writeJson(path, json) {
  return write(path, JSON.stringify(json, null, 2));
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

function addLineToFile(path, added, backward = false) {
  return write(path, addLine(read(path), added, backward));
}

function print(...args) {
  echo(`\x1B[35m[${_printTag}]`, ...args, '\x1B[0m');
}

function printSuccess(...args) {
  echo(`✅  [${_printTag}]`, ...args);
}

function printError(...args) {
  echo(`⚠️ [${_printTag}]`, ...args);
}

const tKey = {};

function measureBegin(name = '⏳') {
  print(`=======Start [${name}=======`);
  tKey[name] = Date.now();
}

function measureEnd(name = '⏳') {
  print(
    `=======End [${name}]==[${(Date.now() - tKey[name]).toLocaleString().split('.')[0]}ms]=======`,
  );
}

async function input(message) {
  if (message) {
    return question(message + ': ');
  } else {
    return stdin();
  }
}

async function fixLint(path) {
  await $`yarn prettier ${path} --write --log-level silent`;
  await $`yarn eslint ${path} --fix --quiet --max-warnings 100`;
}

const HEADING = `// @ts-nocheck
/* eslint-disable */
/**
 * Generated file. Don't modify manually.
 */
 `;

// endregion

const source = argv._[0];
if (!source) {
  printError('Source path is not passed');
  process.exit(1);
}

print(`Generation Start, Source: ${source}`);

const tmpFile = '.tmpThemeGen.ts';
const outputFile =
  argv.output ||
  './node_modules/react-native-themed-styled-system/lib/typescript/@types/ThemedTypings.d.ts';

try {
  await $`yarn react-native-themed-styled-system-cli generate --out ${tmpFile} ${source}`;

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
    'space: SpaceValue | `${number}` | `${number}px` | `${any}px` | ',
  );

  result = result.replace(
    'sizes:',
    'sizes: SizesValue | `${number}` | `${number}px` | `${any}px` | ',
  );

  result = result.replace(
    'radii:',
    'radii: RadiiValue | `${number}` | `${number}px` | `${any}px` | ',
  );

  result = result.replace('colors:', 'colors: ColorsValue | ');
  result = result.replace(/typography:\W*?\n/, 'typography: string;');

  result = result.replace(/\|[\s ]*\n/g, ';');

  write(tmpFile, result);
  await $`mv ${tmpFile} ${outputFile}`;
  // await fixLint(outputFile);
  printSuccess(`🎉 Theme Typing Generated in '${outputFile}'`);
} catch (e) {
  printError(e);
  remove(tmpFile);
}
