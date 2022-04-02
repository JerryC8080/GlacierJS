import path from 'path';
import typescript from '@rollup/plugin-typescript';
import findWorkspacePackages from '@pnpm/find-workspace-packages';
import findWorkspaceDir from '@pnpm/find-workspace-dir';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

export default async function main() {
  const PACKAGE_ROOT_PATH = process.cwd();
  const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, "package.json"));
  const ROOT_PATH = await findWorkspaceDir();
  const ALL_MODULES = await findWorkspacePackages(ROOT_PATH).then(
    result =>
      result.filter(info =>
        !info.manifest.private).map(info =>
          info.manifest.name)
  );

  const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, "src/index.ts");
  const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, "dist");

  const config = {
    input: INPUT_FILE,
    external: ALL_MODULES,
    output: {
      globals: ALL_MODULES.reduce((acc, val) => ({ ...acc, [val]: val }), {}),
      file: path.join(OUTPUT_DIR, `index.js`),
      format: 'umd',
      name: PKG_JSON.name,
      sourcemap: true,
    },
    plugins: [
      typescript(), 
      commonjs(),
      injectProcessEnv({
        NODE_ENV: process.env.NODE_ENV,
      }),
      nodeResolve(),
    ]
  }

  return config;
}