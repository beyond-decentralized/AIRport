import { IQueryResultsSerializer } from '@airport/arrivals-n-departures';
import { DbEntity, IEntityStateManager } from '@airport/ground-control';
import { IApplicationUtils } from '@airport/tarmaq-query';
export declare class QueryResultsSerializer implements IQueryResultsSerializer {
    serialize<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils): T;
    private doSerialize;
}
//# sourceMappingURL=QueryResultsSerializer.d.ts.map