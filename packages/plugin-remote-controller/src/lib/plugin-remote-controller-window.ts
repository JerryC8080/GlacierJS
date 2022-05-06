import { WindowPlugin, UseContext as WindowUseContext } from '@glacierjs/window';
import { logger } from './logger';
import { RemoteControllerBase } from './plugin-remote-controller-base';

export class RemoteControllerWindow extends RemoteControllerBase implements WindowPlugin {
  private context: WindowUseContext;

  public onUse(context: WindowUseContext): void {
    this.context = context;
  }

  public async beforeRegister(): Promise<void> {
    try {
      const { config } = await this.getConfig();
      if (config?.switch !== true) throw new Error('switch closed');
    } catch (error) {
      logger.debug('checking switch config invalid, going to unregister service worker');
      this.context.glacier.unregister();
      throw new Error('checking switch config invalid, cutting off register process');
    }
  }
}
