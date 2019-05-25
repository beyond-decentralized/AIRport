import { AbstractQuery, IQEntity, IUtils } from '@airport/air-control';
import { IStoreDriver, PortableQuery, QueryResultType } from '@airport/ground-control';
export declare class AbstractMutationManager {
    protected utils: IUtils;
    protected dataStore: IStoreDriver;
    constructor();
    protected getPortableQuery(schemaIndex: number, tableIndex: number, query: AbstractQuery, queryResultType: QueryResultType): PortableQuery;
    protected doInsertValues<IQE extends IQEntity>(q: IQEntity, entities: any[]): Promise<number>;
}
