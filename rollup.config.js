import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

const path = require('path');
const files = {
  app: './src/svelte.js'
}
export default [{
  input: files,
  output: [
    {
      name: 'app',
      dir: `${__dirname}/assets`,
      entryFileNames: 'js/[name].js',
      sourcemap: true,
      format: 'iife',
    }
  ],
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        scss: true,
        postcss: true,
      }),
      dev: true,
      emitCss: true,
    }),
    resolve({
      alias: {
        svelte: path.resolve('node_modules', 'svelte')
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
    }),
    commonjs(),
    babel({
      extensions: ['.mjs', '.js', '.svelte'],
      babelrc: false,
      configFile: './babel.config.json',
      exclude: ['node_modules/core-js/**'],
    }),
    postcss({
      use: 'sass',
      extensions: ['.scss', '.css'],
      minimize: false,
      sourceMap: true,
      config: { path: 'postcss.config.js' },
      extract: 'css/app.css'
    })
  ],
}, {
  input: files,
  output: [
    {
      name: 'app',
      dir: `${__dirname}/assets`,
      entryFileNames: 'js/[name].min.js',
      sourcemap: false,
      format: 'iife',
      plugins: [terser()]
    }
  ],
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        scss: true,
        postcss: true
      }),
      dev: false,
      emitCss: true,
    }),
    resolve({
      alias: {
        svelte: path.resolve('node_modules', 'svelte')
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
    }),
    commonjs(),
    babel({
      extensions: ['.mjs', '.js', '.svelte'],
      babelrc: false,
      configFile: './babel.config.json',
      exclude: ['node_modules/core-js/**'],
    }),
    postcss({
      use: 'sass',
      extensions: ['.scss', '.css'],
      minimize: true,
      sourceMap: false,
      config: { path: 'postcss.config.js' },
      extract: 'css/app.min.css'
    })
  ],
}];
