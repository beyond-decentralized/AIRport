import { StoreType } from '@airport/terminal-map';
export interface IDatabaseManager {
    isInitialized(): boolean;
    init(domainName: string, storeType: StoreType): Promise<void>;
}
export declare class DatabaseManager implements IDatabaseManager {
    private airDb;
    isInitialized(): boolean;
    init(domainName: string, storeType: StoreType): Promise<void>;
    private initTerminal;
    private bulkCreate;
    private installAirportSchema;
}
