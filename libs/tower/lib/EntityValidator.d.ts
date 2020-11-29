import { DbProperty, OperationType } from '@airport/ground-control';
import { IOperationContext } from './OperationContext';
export interface IEntityValidator {
    validate<E, EntityCascadeGraph>(entities: E[], operatedOnEntityIndicator: boolean[], operationType: OperationType, context: IOperationContext<E, EntityCascadeGraph>): Promise<void>;
}
export declare class EntityValidator {
    validate<E, EntityCascadeGraph>(entities: E[], operatedOnEntityIndicator: boolean[], operationType: OperationType, context: IOperationContext<E, EntityCascadeGraph>): Promise<void>;
    protected assertRelationValueIsAnObject(relationValue: any, dbProperty: DbProperty): void;
    protected assertManyToOneNotArray(relationValue: any, dbProperty: DbProperty): void;
    protected assertOneToManyIsArray(relationValue: any, dbProperty: DbProperty): void;
}
//# sourceMappingURL=EntityValidator.d.ts.map