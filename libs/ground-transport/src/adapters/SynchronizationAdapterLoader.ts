import { DI } from "@airport/di";
import { SYNCHRONIZATION_ADAPTER_LOADER } from "../tokens";
import { DebugSynchronizationAdapter } from "./DebugSynchronizationAdapter";
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
                return new DebugSynchronizationAdapter()
            }
            default:
                throw new Error(`Unexpected synchronization source: ${synchronizationSource}`)
        }
    }

}
DI.set(SYNCHRONIZATION_ADAPTER_LOADER, SynchronizationAdapterLoader)
