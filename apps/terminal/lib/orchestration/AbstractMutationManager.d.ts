import { AbstractQuery, IQEntity, IUtils, QEntity } from "@airport/air-control";
import { IStoreDriver, PortableQuery, QueryResultType } from "@airport/ground-control";
export declare class AbstractMutationManager {
    protected utils: IUtils;
    protected dataStore: IStoreDriver;
    constructor(utils: IUtils, dataStore: IStoreDriver);
    protected getPortableQuery(schemaIndex: number, tableIndex: number, query: AbstractQuery, queryResultType: QueryResultType): PortableQuery;
    protected doInsertValues<IQE extends IQEntity>(q: QEntity, entities: any[]): Promise<number>;
}
