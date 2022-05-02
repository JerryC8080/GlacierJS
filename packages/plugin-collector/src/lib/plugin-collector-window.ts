import { WindowPlugin, UseContext } from '@glacierjs/window';

import { logger } from './logger';
import { MESSAGE_FIELD, PLUGIN_NAME } from './constants';
import { CollectedData, CollectedDataType, IPCCallingMessage, IPCCallingType, ReporterWindowOptions } from '../type';

export class CollectorWindow implements WindowPlugin {
    name = PLUGIN_NAME;
    options: ReporterWindowOptions
    context: UseContext;

    constructor(options: ReporterWindowOptions) {
        this.options = options;
    }

    public onUse(context: UseContext) {
        this.context = context;
    }

    public async beforeRegister() {
        // collect window register
        this.send([{ type: CollectedDataType.SW_REGISTER }])

        if (navigator?.serviceWorker?.controller) {
            this.send([{ type: CollectedDataType.SW_CONTROLLED }])
        }

        // fetch collected data from service worker
        const ipcCallingMessage: IPCCallingMessage = {
            field: MESSAGE_FIELD,
            messages: [{ type: IPCCallingType.FETCH_DATA }]
        }
        this.context.workbox.messageSW(ipcCallingMessage).then(collectedData =>  this.send(collectedData));
    }

    private send(collectedData: CollectedData[]) {
        collectedData.forEach(data => {
            logger.debug('send collected data: ', data);
            if (this.options?.send) this.options.send(data);
        })
    }
}
