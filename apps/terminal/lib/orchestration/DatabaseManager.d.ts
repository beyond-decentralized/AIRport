import { StoreType } from '@airport/terminal-map';
export interface IDatabaseManager {
    isInitialized(): boolean;
    init(storeType: StoreType): Promise<void>;
}
export declare class DatabaseManager implements IDatabaseManager {
    private airDb;
    constructor();
    isInitialized(): boolean;
    init(storeType: StoreType): Promise<void>;
    private installAirportSchema;
}
