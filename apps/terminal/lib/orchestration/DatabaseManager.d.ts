import { IAirportDatabase } from "@airport/air-control";
import { StoreType } from "@airport/terminal-map";
export interface IDatabaseManager {
    ensureInitialized(terminalName: string, timeout: number): Promise<void>;
    initializeAll(defaultStoreType: StoreType): void;
    isInitialized(terminalName: string): boolean;
    init(storeType: StoreType, terminalName: string): Promise<void>;
}
export declare class DatabaseManager implements IDatabaseManager {
    private airportDb;
    constructor(airportDb: IAirportDatabase);
    ensureInitialized(terminalName?: string, timeout?: number): Promise<void>;
    initializeAll(defaultStoreType: StoreType): void;
    isInitialized(terminalName: string): boolean;
    init(storeType: StoreType, terminalName: string): Promise<void>;
    private doEnsureInitialized;
}
