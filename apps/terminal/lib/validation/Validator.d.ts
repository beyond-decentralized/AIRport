import { ColumnIndex, DbColumn, DbEntity, SchemaIndex, TableIndex } from "@airport/air-control";
import { JSONRelation } from "@airport/ground-control";
/**
 * Created by Papa on 11/1/2016.
 */
export interface IValidator {
    validateReadFromEntity(relation: JSONRelation): void;
    validateReadProperty(dbColumn: DbColumn): void;
    validateUpdateProperty(propertyName: string, dbEntity: DbEntity): void;
    validateUpdateColumn(dbColumn: DbColumn): void;
    validateInsertQEntity(dbEntity: DbEntity): void;
    validateReadQEntityProperty(schemaIndex: SchemaIndex, tableIndex: TableIndex, columnIndex: ColumnIndex): void;
    validateReadQEntityManyToOneRelation(schemaIndex: SchemaIndex, tableIndex: TableIndex, columnIndex: ColumnIndex): void;
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
    validateReadQEntityProperty(schemaIndex: SchemaIndex, tableIndex: TableIndex, columnIndex: ColumnIndex): void;
    validateReadQEntityManyToOneRelation(schemaIndex: SchemaIndex, tableIndex: TableIndex, columnIndex: ColumnIndex): void;
    addFunctionAlias(functionAlias: string): void;
    addSubQueryAlias(subQueryAlias: string): void;
    validateAliasedFieldAccess(fieldAlias: string): void;
}
export declare function getValidator(dbEntity: DbEntity): IValidator;
