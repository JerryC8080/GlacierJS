import throttle from 'lodash.throttle';
import { PLUGIN_NAME } from './constants';
import { RemoteConfig, Options } from '../type';

export class RemoteControllerBase {
    name = PLUGIN_NAME;
    options: Options = {
        configCacheDuration: 30 * 1000,
        fetchConfig: async () => { throw new Error('options.fetchConfig should be defined on plugin instance created.'); }
    };

    protected fetchConfigThrottle: () => Promise<RemoteConfig>

    constructor(options: Options) {
        if (options) this.options = options;
        this.fetchConfigThrottle = throttle(this.options.fetchConfig, this.options.configCacheDuration)
    }
}
