import { AbstractQuery, IFieldUtils, IQEntity, IQueryUtils, IApplicationUtils, IRelationManager } from '@airport/tarmaq-query';
import { IContext } from '@airport/direction-indicator';
import { PortableQuery, QueryResultType } from '@airport/ground-control';
import { ITransaction } from '@airport/terminal-map';
export declare class AbstractMutationManager {
    applicationUtils: IApplicationUtils;
    fieldUtils: IFieldUtils;
    queryUtils: IQueryUtils;
    relationManager: IRelationManager;
    protected getPortableQuery(applicationIndex: number, tableIndex: number, query: AbstractQuery, queryResultType: QueryResultType): PortableQuery;
    protected doInsertValues(transaction: ITransaction, q: IQEntity, entities: any[], context: IContext): Promise<number>;
}
//# sourceMappingURL=AbstractMutationManager.d.ts.map