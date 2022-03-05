import { WindowPlugin, UseContext as WindowUseContext } from '@glacierjs/window';
import { PLUGIN_NAME } from './constants';
import { logger } from './logger';
import { RemoteControllerBase } from './plugin-remote-controller-base';

export class RemoteControllerWindow extends RemoteControllerBase implements WindowPlugin  {
    name = PLUGIN_NAME;
    context: WindowUseContext;

    onUse(context: WindowUseContext): void {
        this.context = context;
    }

    async beforeRegister(): Promise<void> {
        const config: any = await this.fetchConfigThrottle();
        if (config?.switch === false) {
            logger.debug('switch closed，going to unregister service worker');
            this.context.glacier.unregister();
            throw new Error('switch closed, cutting off register process');
        }
    }
}
