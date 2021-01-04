import { IQEntityInternal, JSONLogicalOperation, Parameter } from '@airport/air-control';
import { ColumnIndex, DbColumn, DbEntity, JSONBaseOperation, JSONClauseField, JSONClauseObject, JSONEntityRelation, JsonFieldQuery, SchemaMap, SchemaVersionId, SqlOperator, TableIndex } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { ISqlValueProvider } from '../../adaptor/SQLQueryAdaptor';
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
    protected context: IOperationContext<any, any>;
    protected fieldMap: SchemaMap;
    protected qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal<any>;
    };
    protected jsonRelationMapByAlias: {
        [entityAlias: string]: JSONEntityRelation;
    };
    protected parameterReferences: (string | number)[];
    constructor(dbEntity: DbEntity, dialect: SQLDialect, context: IOperationContext<any, any>);
    getParameters(parameterMap: {
        [alias: string]: Parameter;
    }, //,
    context: IOperationContext<any, any>): any[];
    getFunctionCallValue(rawValue: any, context: IOperationContext<any, any>): string;
    getFieldFunctionValue(aField: JSONClauseField, defaultCallback: () => string, context: IOperationContext<any, any>): string;
    getFieldValue(clauseField: JSONClauseObject | JSONClauseField[] | JsonFieldQuery, clauseType: ClauseType, defaultCallback: () => string, context: IOperationContext<any, any>): string;
    applyOperator(operator: SqlOperator, rValue: string): string;
    protected getWHEREFragment(operation: JSONBaseOperation, nestingPrefix: string, context: IOperationContext<any, any>): string;
    protected getEntityPropertyColumnName(qEntity: IQEntityInternal<any>, columnIndex: number, context: IOperationContext<any, any>): string;
    protected addFieldFromColumn(dbColumn: DbColumn): void;
    protected addField(schemaVersionId: SchemaVersionId, tableIndex: TableIndex, columnIndex: ColumnIndex): void;
    protected warn(warning: string): void;
    protected getSimpleColumnFragment(tableAlias: string, columnName: string): string;
    protected getComplexColumnFragment(value: JSONClauseField, columnName: string, context: IOperationContext<any, any>): string;
    protected getEntityManyToOneColumnName(qEntity: IQEntityInternal<any>, columnIndex: number, context: IOperationContext<any, any>): string;
    protected getLogicalWhereFragment(operation: JSONLogicalOperation, nestingPrefix: string, context: IOperationContext<any, any>): string;
    protected isParameterReference(value: any): boolean;
}
//# sourceMappingURL=SQLWhereBase.d.ts.map