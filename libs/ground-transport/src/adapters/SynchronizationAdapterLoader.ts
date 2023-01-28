import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import { Repository_GUID } from '@airport/ground-control';
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";

export interface ISynchronizationAdapterLoader {

    load(
        repositoryGUID: Repository_GUID
    ): Promise<ISynchronizationAdapter>

}

@Injected()
export class SynchronizationAdapterLoader
    implements ISynchronizationAdapterLoader {

    @Inject()
    debugSynchronizationAdapter: ISynchronizationAdapter

    async load(
        repositoryGUID: Repository_GUID
    ): Promise<ISynchronizationAdapter> {
        // switch (synchronizationSource) {
        //     case 'IPFS': {
        //         throw new Error(`Not Implemented`)
        //     }
        //     case 'DEVSERVR': {
                return this.debugSynchronizationAdapter
        //     }
        //     default:
        //         throw new Error(`Unexpected synchronization source: ${synchronizationSource}`)
        // }
    }

}
