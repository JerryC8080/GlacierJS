import { ExecutorContext, logger } from '@nrwl/devkit';
import { rollup } from 'rollup';
import rollupConfig from './rollup.config';

/**
 * 每个 package 的打包构建
 * @param options 暂时没有配置，为空对象
 * @param context 
 * @returns 
 */
export default async function distExecutor(
  options,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  let success = false;
  
  try {
    const baseConfig = await rollupConfig({
      packageDir: context.workspace.projects[context.projectName].root,
      outputPath: `dist/${context.projectName}/index.js`,
    });

    const inputOptions = {
      input: baseConfig.input,
      external: baseConfig.external,
      plugins: baseConfig.plugins,
    };

    const outputOptions = baseConfig.output;

    const bundle = await rollup(inputOptions);
    await bundle.generate(outputOptions as any);
    await bundle.write(outputOptions as any);

    success = true;
  } catch (error) {
    logger.error(error);
  }

  return { success };
}