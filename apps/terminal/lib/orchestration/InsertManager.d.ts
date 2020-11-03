import { DbColumn, DbEntity, JsonInsertValues, PortableQuery } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { ITransaction } from '@airport/tower';
export declare type RecordId = number;
export interface IInsertManager {
    insertValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction): Promise<RecordId[] | RecordId[][]>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
}
export declare class InsertManager implements IInsertManager {
    insertValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction): Promise<RecordId[] | RecordId[][]>;
    addRepository(name: string, url?: string, platform?: PlatformType, platformConfig?: string, distributionStrategy?: DistributionStrategy): Promise<number>;
    verifyNoGeneratedColumns(dbEntity: DbEntity, jsonInsertValues: JsonInsertValues, errorPrefix: string): DbColumn[];
    private internalInsertValues;
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
//# sourceMappingURL=InsertManager.d.ts.map