import { ServiceWorkerPlugin, FetchContext } from '@glacierjs/sw';

import { logger } from './logger';
import { MESSAGE_FIELD, PLUGIN_NAME } from './constants';
import { CollectedData, CollectedDataType, IPCCallingMessage, IPCCallingType } from '../type';

export class CollectorSW implements ServiceWorkerPlugin {
    name = PLUGIN_NAME;
    messagePort: MessagePort;
    collectedData: CollectedData[] = [];

    public async onFetch(context: FetchContext) {
        this.collect({ type: CollectedDataType.SW_FETCH });

        const cacheHit = context?.cacheHit;
        if (cacheHit) {
            const payload: CollectedData = { type: CollectedDataType.CACHE_HIT, data: cacheHit }
            logger.debug('cache-hit collected: ', { payload });
            this.collect(payload);
        }
    }

    public async onInstall() {
        const payload: CollectedData = { type: CollectedDataType.SW_INSTALLED }
        logger.debug('installed collected: ', { payload });
        this.collect(payload);
    }

    public async onMessage({ event }) {
        const message: IPCCallingMessage = event?.data;

        // isolation for messages of reporter plugin 
        if (message?.field === MESSAGE_FIELD) {
            const messages = message?.messages || [];
            messages.forEach((message) => {

                // send collected and clear it.
                if (message.type === IPCCallingType.FETCH_DATA) {
                    const collectedData = this.collectedData;
                    this.collectedData = [];
                    event?.ports?.[0].postMessage(collectedData);
                }
            })
        }
    }

    // store collected data, and send it while client wanted.
    private collect(collectedData: CollectedData) {
        this.collectedData.push(collectedData);
    }
}
