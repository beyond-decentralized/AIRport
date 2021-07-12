import { IEntityStateManager } from "@airport/pressurization";
export interface IQueryResultsSerializer {
    serialize<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
}
//# sourceMappingURL=QueryResultsSerializer.d.ts.map