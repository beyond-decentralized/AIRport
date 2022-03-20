import { AbstractQuery, IFieldUtils, IQEntity, IQueryUtils } from '@airport/air-control';
import { IContext } from '@airport/di';
import { PortableQuery, QueryResultType } from '@airport/ground-control';
import { ITransaction } from '@airport/terminal-map';
export declare class AbstractMutationManager {
    protected getPortableQuery(applicationIndex: number, tableIndex: number, query: AbstractQuery, queryResultType: QueryResultType, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): PortableQuery;
    protected doInsertValues(transaction: ITransaction, q: IQEntity, entities: any[], context: IContext): Promise<number>;
}
//# sourceMappingURL=AbstractMutationManager.d.ts.map