import { build } from 'esbuild'

const buildOptions = {
  entryPoints: ['./browser/index.js'],
  outfile: './dist/index.js',
  bundle: true,
  // 压缩
  minify: true,
}

build(buildOptions)
