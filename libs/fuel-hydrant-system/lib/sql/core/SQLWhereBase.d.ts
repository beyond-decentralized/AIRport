import { IAirportDatabase, IQEntityInternal, IQMetadataUtils, ISchemaUtils, Parameter } from '@airport/air-control';
import { ColumnIndex, DbColumn, DbEntity, JSONBaseOperation, JSONClauseField, JSONClauseObject, JSONEntityRelation, JsonFieldQuery, SchemaMap, SchemaVersionId, SqlOperator, TableIndex } from '@airport/ground-control';
import { ISQLQueryAdaptor, ISqlValueProvider } from '../../adaptor/SQLQueryAdaptor';
import { IValidator } from '../../validation/Validator';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare enum ClauseType {
    MAPPED_SELECT_CLAUSE = 0,
    NON_MAPPED_SELECT_CLAUSE = 1,
    WHERE_CLAUSE = 2,
    FUNCTION_CALL = 3
}
export declare abstract class SQLWhereBase implements ISqlValueProvider {
    protected dbEntity: DbEntity;
    protected dialect: SQLDialect;
    protected fieldMap: SchemaMap;
    protected qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal;
    };
    protected jsonRelationMapByAlias: {
        [entityAlias: string]: JSONEntityRelation;
    };
    protected sqlAdaptor: ISQLQueryAdaptor;
    protected validator: IValidator;
    protected parameterReferences: (string | number)[];
    constructor(dbEntity: DbEntity, dialect: SQLDialect);
    getParameters(parameterMap: {
        [alias: string]: Parameter;
    }): any[];
    protected getWHEREFragment(operation: JSONBaseOperation, nestingPrefix: string, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    private getLogicalWhereFragment;
    protected getEntityPropertyColumnName(qEntity: IQEntityInternal, columnIndex: number, metadataUtils: IQMetadataUtils): string;
    protected addFieldFromColumn(dbColumn: DbColumn): void;
    protected addField(schemaVersionId: SchemaVersionId, tableIndex: TableIndex, columnIndex: ColumnIndex): void;
    protected warn(warning: string): void;
    getFunctionCallValue(rawValue: any, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    getFieldFunctionValue(aField: JSONClauseField, defaultCallback: () => string, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    getFieldValue(clauseField: JSONClauseObject | JSONClauseField[] | JsonFieldQuery, clauseType: ClauseType, defaultCallback: () => string, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    private isParameterReference;
    protected getSimpleColumnFragment(tableAlias: string, columnName: string): string;
    protected getComplexColumnFragment(value: JSONClauseField, columnName: string, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    protected getEntityManyToOneColumnName(qEntity: IQEntityInternal, columnIndex: number, metadataUtils: IQMetadataUtils): string;
    applyOperator(operator: SqlOperator, rValue: string): string;
}
