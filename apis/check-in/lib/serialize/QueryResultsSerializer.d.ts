import { ISchemaUtils } from "@airport/air-control";
import { DbEntity } from "@airport/ground-control";
import { IEntityStateManager } from "@airport/pressurization";
export interface IQueryResultsSerializer {
    serialize<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, schemaUtils: ISchemaUtils): T;
}
//# sourceMappingURL=QueryResultsSerializer.d.ts.map