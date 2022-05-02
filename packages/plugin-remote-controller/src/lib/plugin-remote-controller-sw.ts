import { ServiceWorkerPlugin, UseContext } from '@glacierjs/sw';
import { AssetsCacheSW, PLUGIN_NAME as PLUGIN_NAME_OF_ASSETS_CACHE } from '@glacierjs/plugin-assets-cache';
import { logger } from './logger';
import { PLUGIN_NAME } from './constants';
import { RemoteControllerBase } from './plugin-remote-controller-base';

export class RemoteControllerSW extends RemoteControllerBase implements ServiceWorkerPlugin {
    name = PLUGIN_NAME;
    context: UseContext;
    configCacheJson: string

    public onUse(context: UseContext): void {
        this.context = context;
    }

    public async onInstall(): Promise<void> {
        try {
            const { config } = await this.getConfig();
            if (config?.switch !== true) throw new Error('switch closed');
        } catch (error) {
            logger.error(error);
            throw new Error('checking config switch invalid, cutting off install process');
        }
    }

    public async onFetch(): Promise<void> {
        try {
            const { config: { assetsCacheRoutes }, configUpdated } = await this.getConfig();

            const assetsCachePluginIns = (this.context.glacier.plugins[PLUGIN_NAME_OF_ASSETS_CACHE] as AssetsCacheSW);
            if (assetsCachePluginIns && configUpdated) {
                logger.info(`going to update routes with remote config: ${assetsCacheRoutes}`);
                assetsCachePluginIns.updateRoutes(assetsCacheRoutes);
            }
        } catch (error) {
            logger.error('checking config switch invalid, going to uninstall service worker.', error);
            this.context.glacier.uninstall();
        }
    }

    private async getConfig() {
        let configUpdated = false;
        const config = await this.fetchConfigThrottle();

        // checking is it updated.
        if (JSON.stringify(config) !== this.configCacheJson) {
            this.configCacheJson = JSON.stringify(config);
            configUpdated = true;
        }

        if (config?.switch !== true) throw new Error('switch closed');

        return { config, configUpdated };
    }
}
