import { DbColumn, DbEntity, DbProperty } from '@airport/ground-control';
import { IOperationContext, IStructuralEntityValidator } from '@airport/terminal-map';
export declare class StructuralEntityValidator implements IStructuralEntityValidator {
    validate<E>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext, fromOneToMany?: boolean, parentRelationProperty?: DbProperty, parentRelationRecord?: any): Promise<void>;
    protected isRepositoryColumnAndNewRepositoryNeed<E>(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, entity: E, columnValue: any, context: IOperationContext): boolean;
    protected ensureIdValue(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, isIdColumnEmpty: boolean): void;
    protected ensureNonRelationalValue(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
    protected throwUnexpectedProperty(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map