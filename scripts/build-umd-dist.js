const pnpm = require('@pnpm/exec').default;
const findWorkspaceDir = require('@pnpm/find-workspace-dir').default;
const path = require('path');

const main = async () => {
  const ROOT_PATH = await findWorkspaceDir();

  pnpm([
    '--filter',
    './packages', 
    '-rc',
    '--parallel',
    'exec',
    `rollup -c ${path.join(ROOT_PATH, 'rollup.config.js')}`
  ]).then(() => {
      console.log('Done');
  }).catch((err) => {
      console.error(err);
  })
}

main();