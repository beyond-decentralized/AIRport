import { container, DI } from "@airport/di";
import { DEBUG_SYNCHRONIZATION_ADAPTER, SYNCHRONIZATION_ADAPTER_LOADER } from "../tokens";
export class SynchronizationAdapterLoader {
    async load(synchronizationSource) {
        switch (synchronizationSource) {
            case 'IPFS': {
                throw new Error(`Not Implemented`);
            }
            case 'localhost:9000': {
                return await container(this).get(DEBUG_SYNCHRONIZATION_ADAPTER);
            }
            default:
                throw new Error(`Unexpected synchronization source: ${synchronizationSource}`);
        }
    }
}
DI.set(SYNCHRONIZATION_ADAPTER_LOADER, SynchronizationAdapterLoader);
//# sourceMappingURL=SynchronizationAdapterLoader.js.map