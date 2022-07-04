import { ApplicationColumn_Index, DbColumn, DbEntity, JSONRelation, Application_Index, ApplicationEntity_TableIndex } from '@airport/ground-control';
/**
 * Created by Papa on 11/1/2016.
 */
export interface IValidator {
    validateReadFromEntity(relation: JSONRelation): void;
    validateReadProperty(dbColumn: DbColumn): void;
    validateUpdateProperty(propertyName: string, dbEntity: DbEntity): void;
    validateUpdateColumn(dbColumn: DbColumn): void;
    validateInsertQEntity(dbEntity: DbEntity): void;
    validateReadQEntityProperty(applicationIndex: Application_Index, tableIndex: ApplicationEntity_TableIndex, columnIndex: ApplicationColumn_Index): void;
    validateReadQEntityManyToOneRelation(applicationIndex: Application_Index, tableIndex: ApplicationEntity_TableIndex, columnIndex: ApplicationColumn_Index): void;
    addFunctionAlias(functionAlias: string): void;
    addSubQueryAlias(subQueryAlias: string): void;
    validateAliasedFieldAccess(fieldAlias: string): void;
}
export declare class QValidator implements IValidator {
    validateInsertQEntity(dbEntity: DbEntity): void;
    validateReadFromEntity(relation: JSONRelation): void;
    validateReadProperty(dbColumn: DbColumn): void;
    validateUpdateProperty(propertyName: string, dbEntity: DbEntity): void;
    validateUpdateColumn(dbColumn: DbColumn): void;
    validateReadQEntityProperty(applicationIndex: Application_Index, tableIndex: ApplicationEntity_TableIndex, columnIndex: ApplicationColumn_Index): void;
    validateReadQEntityManyToOneRelation(applicationIndex: Application_Index, tableIndex: ApplicationEntity_TableIndex, columnIndex: ApplicationColumn_Index): void;
    addFunctionAlias(functionAlias: string): void;
    addSubQueryAlias(subQueryAlias: string): void;
    validateAliasedFieldAccess(fieldAlias: string): void;
}
//# sourceMappingURL=Validator.d.ts.map