/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { context } from 'esbuild';

const isWatch = process.argv.includes('--watch');

const define = {
  'process.env.TEST': JSON.stringify(process.env.TEST || ''),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
};

context({
  entryPoints: [
    'src/background.ts',
    'src/content.ts',
    'src/page/rate.ts',
    'src/page/index.ts',
    'src/options/index.ts',
  ],
  bundle: true,
  platform: 'browser',
  define,
  outdir: 'extension',
}).then(async (ctx) => {
  if (isWatch) {
    ctx.watch();
  } else {
    await ctx.rebuild();
    ctx.dispose();
  }
});

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  define,
  build: {
    assetsInlineLimit: 0,
    target: 'es2020',
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: {
        popup: 'src/popup.html',
        welcome: 'src/welcome.html',
        options: 'src/options.html',
        'privacy-policy': 'src/privacy-policy.html',
      },
      output: {
        assetFileNames: '[name].[ext]',
        chunkFileNames(info) {
          return info.name.replace('_', '') + '.js';
        },
        entryFileNames(info) {
          return info.name + '.js';
        },
        manualChunks: {
          gem: ['@mantou/gem'],
        },
      },
    },
    outDir: '../extension',
    emptyOutDir: false,
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      src: '',
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
