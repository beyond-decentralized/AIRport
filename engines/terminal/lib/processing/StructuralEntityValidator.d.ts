import { DbColumn, DbEntity, DbProperty } from '@airport/ground-control';
import { IOperationContext, IStructuralEntityValidator } from '@airport/terminal-map';
export declare class StructuralEntityValidator implements IStructuralEntityValidator {
    validate<E>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext): void;
    protected ensureIdValue(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, isIdColumnEmpty: boolean): void;
    protected ensureNonRelationalValue(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
    protected throwUnexpectedProperty(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map