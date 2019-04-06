import { PortableQuery } from '@airport/ground-control';
import { IActor, ITransactionHistory } from '@airport/holding-pattern';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
export declare type RecordId = number;
export interface IInsertManager {
    insertValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor): Promise<RecordId[]>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
}
export declare class InsertManager implements IInsertManager {
    private airDb;
    private dataStore;
    private seqGenerator;
    private histManager;
    private offlineDataStore;
    private operHistoryDmo;
    private recHistoryDmo;
    private repoManager;
    private repoTransHistoryDmo;
    private transManager;
    constructor();
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
