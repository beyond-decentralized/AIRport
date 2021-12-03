import { DI } from "@airport/di";
import { SYNCHRONIZATION_ADAPTER_LOADER } from "../tokens";
import { DebugSynchronizationAdapter } from "./DebugSynchronizationAdapter";
export class SynchronizationAdapterLoader {
    async load(synchronizationSource) {
        switch (synchronizationSource) {
            case 'IPFS': {
                throw new Error(`Not Implemented`);
            }
            case 'localhost:9000': {
                return new DebugSynchronizationAdapter();
            }
            default:
                throw new Error(`Unexpected synchronization source: ${synchronizationSource}`);
        }
    }
}
DI.set(SYNCHRONIZATION_ADAPTER_LOADER, SynchronizationAdapterLoader);
//# sourceMappingURL=SynchronizationAdapterLoader.js.map