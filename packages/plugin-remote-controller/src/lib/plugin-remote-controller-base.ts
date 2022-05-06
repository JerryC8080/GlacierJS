import throttle from 'lodash.throttle';
import { PLUGIN_NAME } from './constants';
import { RemoteConfig, Options } from '../type';

export class RemoteControllerBase {
    protected configBackup: string;
    protected fetchConfigThrottle: () => Promise<RemoteConfig>
    protected options: Options = {
        configCacheDuration: 30 * 1000,
        fetchConfig: async () => { 
            throw new Error('options.fetchConfig should be defined on plugin instance created.');
        }
    };
    public readonly name = PLUGIN_NAME;

    protected async getConfig() {
        let configUpdated = false;
        const config = await this.fetchConfigThrottle();

        // checking is it updated.
        const rawConfig = JSON.stringify(config);
        if (rawConfig !== this.configBackup) {
            this.configBackup = rawConfig;
            configUpdated = true;
        }

        return { config, configUpdated };
    }

    constructor(options: Options) {
        if (options) Object.assign(this.options, options);
        this.fetchConfigThrottle = throttle(this.options.fetchConfig, this.options.configCacheDuration)
    }
}
