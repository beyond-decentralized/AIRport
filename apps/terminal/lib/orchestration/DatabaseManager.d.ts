import { IAirportDatabase } from "@airport/air-control";
import { StoreType } from "@airport/terminal-map";
export interface IDatabaseManager {
    ensureInitialized(databaseName: string, timeout: number): Promise<void>;
    initializeAll(defaultStoreType: StoreType): void;
    isInitialized(databaseName: string): boolean;
    init(storeType: StoreType, databaseName: string): Promise<void>;
}
export declare class DatabaseManager implements IDatabaseManager {
    private airportDb;
    constructor(airportDb: IAirportDatabase);
    ensureInitialized(databaseName?: string, timeout?: number): Promise<void>;
    initializeAll(defaultStoreType: StoreType): void;
    isInitialized(databaseName: string): boolean;
    init(storeType: StoreType, databaseName: string): Promise<void>;
    private doEnsureInitialized;
}
