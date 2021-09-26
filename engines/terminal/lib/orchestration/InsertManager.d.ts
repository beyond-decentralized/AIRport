import { IContext } from '@airport/di';
import { DbColumn, DbEntity, DistributionStrategy, JsonInsertValues, PlatformType, PortableQuery } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { IInsertManager, ITransaction, RecordId } from '@airport/terminal-map';
export declare class InsertManager implements IInsertManager {
    insertValues(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, actor: IActor, transaction: ITransaction, context: IContext): Promise<RecordId[][]>;
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