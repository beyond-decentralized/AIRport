import { IAirportDatabase } from '@airport/air-control';
import { IStoreDriver, PortableQuery } from '@airport/ground-control';
import { IActor, ITransactionHistory, OperationHistoryDmo, RecordHistoryDmo, RepositoryTransactionHistoryDmo, TransactionHistoryDmo } from '@airport/holding-pattern';
import { DistributionStrategy, ITransactionManager, PlatformType } from '@airport/terminal-map';
import { ISequenceGenerator } from '../../node_modules/@airport/fuel-hydrant-system/lib/store/SequenceGenerator';
import { IRepositoryManager } from '../core/repository/RepositoryManager';
import { IOfflineDeltaStore } from '../data/OfflineDeltaStore';
import { IHistoryManager } from './HistoryManager';
export declare type RecordId = number;
export interface IInsertManager {
    insertValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor): Promise<RecordId[]>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
}
export declare class InsertManager implements IInsertManager {
    private airportDb;
    private dataStore;
    private sequenceGenerator;
    private historyManager;
    private offlineDataStore;
    private operationHistoryDmo;
    private recordHistoryDmo;
    private repositoryManager;
    private repositoryTransactionHistoryDmo;
    private transactionHistoryDmo;
    private transactionManager;
    constructor(airportDb: IAirportDatabase, dataStore: IStoreDriver, sequenceGenerator: ISequenceGenerator, historyManager: IHistoryManager, offlineDataStore: IOfflineDeltaStore, operationHistoryDmo: OperationHistoryDmo, recordHistoryDmo: RecordHistoryDmo, repositoryManager: IRepositoryManager, repositoryTransactionHistoryDmo: RepositoryTransactionHistoryDmo, transactionHistoryDmo: TransactionHistoryDmo, transactionManager: ITransactionManager);
    readonly currentTransHistory: ITransactionHistory;
    insertValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor): Promise<RecordId[]>;
    private internalInsertValues;
    addRepository(name: string, url?: string, platform?: PlatformType, platformConfig?: string, distributionStrategy?: DistributionStrategy): Promise<number>;
    private ensureGeneratedValues;
    private ensureRepositoryEntityIdValues;
    /**
     *
     * All repository records must have ids when inserted.  Currently AP doesn't support
     * inserting from select and in the values provided id's must either be explicitly
     * specified or already provided. For all repository entities all ids must be
     * auto-generated.
     *
     * @param {DbEntity} dbEntity
     * @param {PortableQuery} portableQuery
     * @returns {Promise<void>}
     */
    private addInsertHistory;
}
