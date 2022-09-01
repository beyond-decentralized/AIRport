import { DbColumn, DbEntity, DbProperty, IEntityStateManager, IRepository } from '@airport/ground-control';
import { IApplicationUtils } from '@airport/tarmaq-query';
import { IMissingRepositoryRecord, IOperationContext, IStructuralEntityValidator, ITransactionContext } from '@airport/terminal-map';
export declare class StructuralEntityValidator implements IStructuralEntityValidator {
    applicationUtils: IApplicationUtils;
    entityStateManager: IEntityStateManager;
    validate<E>(records: E[], operatedOnEntityIndicator: boolean[], missingRepositoryRecords: IMissingRepositoryRecord[], topLevelObjectRepositories: IRepository[], context: IOperationContext & ITransactionContext, depth?: number, fromOneToMany?: boolean, parentRelationProperty?: DbProperty, rootRelationRecord?: any, parentRelationRecord?: any): void;
    private ensureRepositoryValidity;
    protected isRepositoryColumnAndNewRepositoryNeed<E>(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, entity: E, columnValue: any, context: IOperationContext): boolean;
    protected ensureIdValue(dbEntity: DbEntity, dbProperty: DbProperty, dbColumn: DbColumn, isCreate: boolean, isIdColumnEmpty: boolean): void;
    protected ensureNonRelationalValue(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
    protected throwUnexpectedProperty(dbProperty: DbProperty, dbColumn: DbColumn, value: any): void;
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map