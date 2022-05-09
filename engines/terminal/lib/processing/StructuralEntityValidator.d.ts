import { IApplicationUtils } from '@airport/air-traffic-control';
import { DbColumn, DbEntity, DbProperty, IEntityStateManager } from '@airport/ground-control';
import { IMissingRepositoryRecord, IOperationContext, IStructuralEntityValidator } from '@airport/terminal-map';
export declare class StructuralEntityValidator implements IStructuralEntityValidator {
    applicationUtils: IApplicationUtils;
    entityStateManager: IEntityStateManager;
    validate<E>(records: E[], operatedOnEntityIndicator: boolean[], missingRepositoryRecords: IMissingRepositoryRecord[], context: IOperationContext, fromOneToMany?: boolean, parentRelationProperty?: DbProperty, rootRelationRecord?: any, parentRelationRecord?: any): void;
    private ensureRepositoryValidity;
    protected isRepositoryColumnAndNewRepositoryNeed<E>(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, entity: E, columnValue: any, context: IOperationContext): boolean;
    protected ensureIdValue(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, isIdColumnEmpty: boolean): void;
    protected ensureNonRelationalValue(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
    protected throwUnexpectedProperty(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map