import { StoreType } from '@airport/terminal-map';
export interface IDatabaseManager {
    ensureInitialized(terminalName: string, timeout: number): Promise<void>;
    initializeAll(defaultStoreType: StoreType): Promise<void>;
    isInitialized(terminalName: string): boolean;
    init(storeType: StoreType, terminalName: string): Promise<void>;
}
export declare class DatabaseManager implements IDatabaseManager {
    private airDb;
    constructor();
    ensureInitialized(terminalName?: string, timeout?: number): Promise<void>;
    initializeAll(defaultStoreType: StoreType): Promise<void>;
    isInitialized(terminalName: string): boolean;
    init(storeType: StoreType, terminalName: string): Promise<void>;
    private doEnsureInitialized;
}
