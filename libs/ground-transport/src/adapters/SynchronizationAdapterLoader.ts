import { ISynchronizationAdapter } from "./ISynchronizationAdapter";

export interface ISynchronizationAdapterLoader {

    load(
        source: string
    ): Promise<ISynchronizationAdapter>

}

export class SynchronizationAdapterLoader
    implements ISynchronizationAdapterLoader {

    debugSynchronizationAdapter: ISynchronizationAdapter

    async load(
        synchronizationSource: string
    ): Promise<ISynchronizationAdapter> {
        switch (synchronizationSource) {
            case 'IPFS': {
                throw new Error(`Not Implemented`)
            }
            case 'localhost:9000': {
                return this.debugSynchronizationAdapter
            }
            default:
                throw new Error(`Unexpected synchronization source: ${synchronizationSource}`)
        }
    }

}
