export enum Lifecycle {
  onInstall = 'onInstall',
  onUninstall = 'onUninstall',
  onActivate = 'onActivate',
  onMessage = 'onMessage',
  onFetch = 'onFetch',

  // TODO 以下为保留生命周期，未来迭代实现这些生命周期钩子 @JC
  // onSync = 'onSync',
  // onPush = 'onPush',
}
