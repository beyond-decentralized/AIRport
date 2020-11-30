import { DbProperty } from '@airport/ground-control';
import { IOperationContext } from './OperationContext';
export interface IEntityGraphRestorer {
    restoreEntityGraph<T>(root: T | T[], context: IOperationContext<any, any>): T | T[];
}
export declare class EntityGraphRestorer implements IEntityGraphRestorer {
    restoreEntityGraph<T>(root: T | T[], context: IOperationContext<any, any>): T | T[];
    protected linkEntityGraph<T>(currentEntities: T[], entitiesByOperationIndex: any[], context: IOperationContext<any, any>): T[];
    protected assertRelationValueIsAnObject(relationValue: any, dbProperty: DbProperty): void;
    protected assertManyToOneNotArray(relationValue: any, dbProperty: DbProperty): void;
    protected assertOneToManyIsArray(relationValue: any, dbProperty: DbProperty): void;
}
//# sourceMappingURL=EntityGraphRestorer.d.ts.map