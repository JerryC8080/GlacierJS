import * as path from 'path';
import typescript from '@rollup/plugin-typescript';
import findWorkspacePackages from '@pnpm/find-workspace-packages';
import findWorkspaceDir from '@pnpm/find-workspace-dir';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

/**
 * 获取 package 打包构建的 rollup 配置
 * @param options
 * @returns 
 */
export default async function main({ outputPath, packageDir }) {
  const PACKAGE_ROOT_PATH = path.join(process.cwd(), packageDir);
  const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, "package.json"));
  const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, "src/index.ts");

  // glacier 的模块 external 掉，避免重复打包。
  const ROOT_PATH = await findWorkspaceDir(process.cwd());
  const ALL_MODULES = await findWorkspacePackages(ROOT_PATH).then(
    result =>
      result.filter(info =>
        !info.manifest.private).map(info =>
          info.manifest.name)
  );

  const config = {
    input: INPUT_FILE,
    external: ALL_MODULES,
    output: {
      // external 的 glacier 模块作为全局对象引入
      globals: ALL_MODULES.reduce((acc, val) => ({ ...acc, [val]: val }), {}),
      file: outputPath,
      format: 'umd',
      name: PKG_JSON.name,
      sourcemap: true,
    },
    plugins: [
      typescript({
        declaration: false,
        tsconfig: path.join(PACKAGE_ROOT_PATH, 'tsconfig.json'),
      }),
      commonjs(),
      injectProcessEnv({
        NODE_ENV: process.env.NODE_ENV,
      }),
      nodeResolve(),
    ]
  }

  return config;
}