import {
    container,
    DI
} from "@airport/di";
import {
    DEBUG_SYNCHRONIZATION_ADAPTER,
    SYNCHRONIZATION_ADAPTER_LOADER
} from "../tokens";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";

export interface ISynchronizationAdapterLoader {

    load(
        source: string
    ): Promise<ISynchronizationAdapter>

}

export class SynchronizationAdapterLoader
    implements ISynchronizationAdapterLoader {

    async load(
        synchronizationSource: string
    ): Promise<ISynchronizationAdapter> {
        switch (synchronizationSource) {
            case 'IPFS': {
                throw new Error(`Not Implemented`)
            }
            case 'localhost:9000': {
                return await container(this).get(DEBUG_SYNCHRONIZATION_ADAPTER)
            }
            default:
                throw new Error(`Unexpected synchronization source: ${synchronizationSource}`)
        }
    }

}
DI.set(SYNCHRONIZATION_ADAPTER_LOADER, SynchronizationAdapterLoader)
