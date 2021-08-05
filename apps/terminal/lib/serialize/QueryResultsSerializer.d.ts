import { ISchemaUtils } from '@airport/air-control';
import { IQueryResultsSerializer } from '@airport/check-in';
import { DbEntity } from '@airport/ground-control';
import { IEntityStateManager } from '@airport/pressurization';
export declare class QueryResultsSerializer implements IQueryResultsSerializer {
    serialize<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, schemaUtils: ISchemaUtils): T;
    private doSerialize;
}
//# sourceMappingURL=QueryResultsSerializer.d.ts.map