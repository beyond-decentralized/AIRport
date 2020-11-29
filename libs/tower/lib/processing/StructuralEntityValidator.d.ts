import { DbColumn, DbEntity, DbProperty } from '@airport/ground-control';
import { IOperationContext } from './OperationContext';
export interface IStructuralEntityValidator {
    validate<E, EntityCascadeGraph>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext<E, EntityCascadeGraph>): Promise<void>;
}
export declare class StructuralEntityValidator {
    validate<E, EntityCascadeGraph>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext<E, EntityCascadeGraph>): Promise<void>;
    protected ensureIdValue(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, isIdColumnEmpty: boolean): void;
    protected ensureNonRelationalValue(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
    protected throwUnexpectedProperty(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
    protected assertRelationValueIsAnObject(relationValue: any, dbProperty: DbProperty): void;
    protected assertManyToOneNotArray(relationValue: any, dbProperty: DbProperty): void;
    protected assertOneToManyIsArray(relationValue: any, dbProperty: DbProperty): void;
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map