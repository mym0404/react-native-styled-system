#!/usr/bin/env zx
/* eslint-disable max-len */
// region ZX Util
import fs from 'fs-extra';

const join = path.join;
const filename = path.basename(__filename);
const _printTag = 'Theme Gen' || filename;

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
  echo(`\x1B[36m\x1B[46m✅  [${_printTag}]`, ...args, '\x1B[0m');
}

function printError(...args) {
  echo(`\x1B[31m\x1b[43m⚠️ [${_printTag}]`, ...args, '\x1B[0m');
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
  await $`yarn prettier ${path} --write --loglevel silent`;
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
  './node_modules/@mj-studio/react-native-styled-system/dist/@types/ThemedTypings.d.ts';

try {
  await $`chakra-cli tokens --no-format --out ${tmpFile} ${source}`;

  /**
   * export interface ThemedTypings {
   * @type {string}
   */

  let result = read(tmpFile);
  result = result.replace(/import.*/, '');
  result = result.replace(/export.*/, 'export interface ThemedTypings {');
  result = result.replace(/\/\/.*/g, '');
  result = result.replace(/blur.*/, '');
  result = result.replace(/borders.*/, '');
  result = result.replace(/borderStyles.*/, '');
  result = result.replace(/borderWidths.*/, '');
  result = result.replace(/breakpoints.*/, '');
  result = result.replace(/colorSchemes.*/, '');
  result = result.replace(/fonts.*/, '');
  result = result.replace(/fontSizes.*/, '');
  result = result.replace(/fontWeights.*/, '');
  result = result.replace(/layerStyles.*/, '');
  result = result.replace(/letterSpacings.*/, '');
  result = result.replace(/lineHeights.*/, '');
  result = result.replace(/radii.*/, '');
  result = result.replace(/shadows.*/, '');
  result = result.replace(/sizes.*/, '');
  result = result.replace(/textStyles.*/, '');
  result = result.replace(/transition.*/, '');
  result = result.replace(/zIndices.*/, '');
  result = result.replace(/components.*\n.*\n.*/, '');
  result = result.replaceAll('| (string & {});', '');
  result = result.replaceAll('string & {}', '');
  result = result.replaceAll('space:', 'space: number |');

  write(tmpFile, result);
  await $`mv ${tmpFile} ${outputFile}`;
  await fixLint(outputFile);
  printSuccess(`🎉 Theme Typing Generated in '${outputFile}'`);
} catch (e) {
  printError(e);
  remove(tmpFile);
}
