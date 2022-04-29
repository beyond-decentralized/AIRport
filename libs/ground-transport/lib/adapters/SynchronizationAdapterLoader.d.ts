import { ISynchronizationAdapter } from "./ISynchronizationAdapter";
export interface ISynchronizationAdapterLoader {
    load(source: string): Promise<ISynchronizationAdapter>;
}
export declare class SynchronizationAdapterLoader implements ISynchronizationAdapterLoader {
    debugSynchronizationAdapter: ISynchronizationAdapter;
    load(synchronizationSource: string): Promise<ISynchronizationAdapter>;
}
//# sourceMappingURL=SynchronizationAdapterLoader.d.ts.map