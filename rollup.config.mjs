/* eslint-disable @typescript-eslint/no-var-requires */
// const babel = require('@rollup/plugin-babel');
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import banner from 'rollup-plugin-banner2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import ts from 'rollup-plugin-typescript2';

const useClientFileExclude = ['index'].reduce((acc, name) => {
  acc.push(`${name}.js`, `${name}.mjs`, `${name}.cjs`);

  return acc;
}, []);

const useClientPrefixInclude = ['src/server/'];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true,
      },
      {
        dir: 'esm',
        format: 'esm',
        preserveModules: true,
      },
    ],
    external: ['react', 'react-native'],
    plugins: [
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      commonjs(),
      peerDepsExternal(),
      ts({ tsconfig: './tsconfig.json' }),
      banner((chunk) => {
        const skip =
          useClientFileExclude.includes(chunk.fileName) ||
          useClientPrefixInclude.some((prefix) => chunk.fileName.startsWith(prefix)) ||
          !chunk.fileName.startsWith('src');

        if (skip) {
          // console.log('skipped', chunk.fileName);

          return;
        }

        return "'use client';\n";
      }),
      preserveDirectives(),
      terser({ compress: { directives: false } }),
    ],
  },
];
