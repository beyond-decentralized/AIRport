import { IQEntityInternal, JSONLogicalOperation, Parameter } from '@airport/air-control';
import { ColumnIndex, DbColumn, DbEntity, JSONBaseOperation, JSONClauseField, JSONClauseObject, JSONEntityRelation, JsonFieldQuery, SchemaIndex, SchemaMap, SqlOperator, TableIndex } from '@airport/ground-control';
import { ISqlValueProvider } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
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
    protected context: IFuelHydrantContext;
    protected fieldMap: SchemaMap;
    protected qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal<any>;
    };
    protected jsonRelationMapByAlias: {
        [entityAlias: string]: JSONEntityRelation;
    };
    protected parameterReferences: (string | number)[];
    constructor(dbEntity: DbEntity, dialect: SQLDialect, context: IFuelHydrantContext);
    getParameters(parameterMap: {
        [alias: string]: Parameter;
    }, //,
    context: IFuelHydrantContext): any[];
    getFunctionCallValue(rawValue: any, context: IFuelHydrantContext): string;
    getFieldFunctionValue(aField: JSONClauseField, defaultCallback: () => string, context: IFuelHydrantContext): string;
    getFieldValue(clauseField: JSONClauseObject | JSONClauseField[] | JsonFieldQuery, clauseType: ClauseType, defaultCallback: () => string, context: IFuelHydrantContext): string;
    applyOperator(operator: SqlOperator, rValue: string): string;
    protected getWHEREFragment(operation: JSONBaseOperation, nestingPrefix: string, context: IFuelHydrantContext): string;
    protected getEntityPropertyColumnName(qEntity: IQEntityInternal<any>, columnIndex: number, context: IFuelHydrantContext): string;
    protected addFieldFromColumn(dbColumn: DbColumn): void;
    protected addField(schemaIndex: SchemaIndex, tableIndex: TableIndex, columnIndex: ColumnIndex): void;
    protected warn(warning: string): void;
    protected getSimpleColumnFragment(tableAlias: string, columnName: string): string;
    protected getComplexColumnFragment(value: JSONClauseField, columnName: string, context: IFuelHydrantContext): string;
    protected getEntityManyToOneColumnName(qEntity: IQEntityInternal<any>, columnIndex: number, context: IFuelHydrantContext): string;
    protected getLogicalWhereFragment(operation: JSONLogicalOperation, nestingPrefix: string, context: IFuelHydrantContext): string;
    protected isParameterReference(value: any): boolean;
}
//# sourceMappingURL=SQLWhereBase.d.ts.map