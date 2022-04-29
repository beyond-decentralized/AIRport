export class SynchronizationAdapterLoader {
    async load(synchronizationSource) {
        switch (synchronizationSource) {
            case 'IPFS': {
                throw new Error(`Not Implemented`);
            }
            case 'localhost:9000': {
                return this.debugSynchronizationAdapter;
            }
            default:
                throw new Error(`Unexpected synchronization source: ${synchronizationSource}`);
        }
    }
}
//# sourceMappingURL=SynchronizationAdapterLoader.js.map