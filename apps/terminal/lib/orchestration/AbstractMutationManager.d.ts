import { AbstractQuery, IFieldUtils, IQEntity, IQueryUtils } from '@airport/air-control';
import { PortableQuery, QueryResultType } from '@airport/ground-control';
import { ITransaction } from '@airport/tower';
export declare class AbstractMutationManager {
    protected getPortableQuery(schemaIndex: number, tableIndex: number, query: AbstractQuery, queryResultType: QueryResultType, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): PortableQuery;
    protected doInsertValues<IQE extends IQEntity>(transaction: ITransaction, q: IQEntity, entities: any[]): Promise<number>;
}
//# sourceMappingURL=AbstractMutationManager.d.ts.map