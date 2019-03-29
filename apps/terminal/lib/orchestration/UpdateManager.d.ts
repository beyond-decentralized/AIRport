import { IAirportDatabase, IUtils } from '@airport/air-control';
import { IStoreDriver, PortableQuery } from '@airport/ground-control';
import { IActor, IOperationHistoryDmo, IRecordHistoryDmo, IRepositoryTransactionHistoryDmo, ITransactionHistoryDmo } from '@airport/holding-pattern';
import { ITransactionManager } from '@airport/terminal-map';
import { IRepositoryManager } from '../core/repository/RepositoryManager';
import { IOfflineDeltaStore } from '../data/OfflineDeltaStore';
import { IHistoryManager } from './HistoryManager';
export interface IUpdateManager {
    updateValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
}
export declare class UpdateManager implements IUpdateManager {
    private airDb;
    private dataStore;
    private histManager;
    private offlineDataStore;
    private operHistoryDmo;
    private recHistoryDmo;
    private repoManager;
    private repoTransHistoryDmo;
    private transHistoryDmo;
    private transManager;
    private utils;
    constructor(airDb: IAirportDatabase, dataStore: IStoreDriver, histManager: IHistoryManager, offlineDataStore: IOfflineDeltaStore, operHistoryDmo: IOperationHistoryDmo, recHistoryDmo: IRecordHistoryDmo, repoManager: IRepositoryManager, repoTransHistoryDmo: IRepositoryTransactionHistoryDmo, transHistoryDmo: ITransactionHistoryDmo, transManager: ITransactionManager, utils: IUtils);
    updateValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    private addUpdateHistory;
    private addNewValueHistory;
    private groupRecordsByRepository;
}
