/* eslint-disable global-require */
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    plugins: [
      terser(),
      typescript({
        typescript: require('typescript'),
      }),
    ],
    output: {
      file: 'umd/your-module.js',
      format: 'umd',
      name: 'yourModule',
      esModule: false,
    },
  },
  {
    input: 'src/index.ts',
    plugins: [
      terser(),
      typescript({
        typescript: require('typescript'),
      }),
    ],
    output: {
      file: 'esm/index.js',
      format: 'esm',
    },
  },
]
