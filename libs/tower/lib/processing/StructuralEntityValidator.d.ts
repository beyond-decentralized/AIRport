import { DbColumn, DbEntity, DbProperty } from '@airport/ground-control';
import { IOperationContext } from './OperationContext';
export interface IStructuralEntityValidator {
    validate<E, EntityCascadeGraph>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext<E, EntityCascadeGraph>): void;
}
export declare class StructuralEntityValidator {
    validate<E, EntityCascadeGraph>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext<E, EntityCascadeGraph>): void;
    protected ensureIdValue(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, isIdColumnEmpty: boolean): void;
    protected ensureNonRelationalValue(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
    protected throwUnexpectedProperty(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map