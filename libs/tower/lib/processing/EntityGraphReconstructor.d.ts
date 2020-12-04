import { DbProperty } from '@airport/ground-control';
import { IOperationContext } from './OperationContext';
export interface IEntityGraphReconstructor {
    restoreEntityGraph<T>(root: T[], context: IOperationContext<any, any>): T[];
}
/**
 * Takes a serialized object tree and reconstructs a (potentially)
 * interlinked object graph.
 */
export declare class EntityGraphReconstructor implements IEntityGraphReconstructor {
    restoreEntityGraph<T>(root: T[], context: IOperationContext<any, any>): T[];
    protected linkEntityGraph<T>(currentEntities: T[], entitiesByOperationIndex: any[], context: IOperationContext<any, any>): T[];
    protected assertRelationValueIsAnObject(relationValue: any, dbProperty: DbProperty): void;
    protected assertManyToOneNotArray(relationValue: any, dbProperty: DbProperty): void;
    protected assertOneToManyIsArray(relationValue: any, dbProperty: DbProperty): void;
}
//# sourceMappingURL=EntityGraphReconstructor.d.ts.map