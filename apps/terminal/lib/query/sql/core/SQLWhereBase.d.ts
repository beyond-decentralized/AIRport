import { ColumnIndex, DbColumn, DbEntity, IAirportDatabase, IQEntityInternal, IUtils, Parameter, TableIndex } from "@airport/air-control";
import { JSONBaseOperation, JSONClauseField, JSONClauseObject, JSONEntityRelation, JsonFieldQuery, SqlOperator } from "@airport/ground-control";
import { SchemaMap } from "@airport/terminal-map";
import { IValidator } from "../../../validation/Validator";
import { ISQLQueryAdaptor, ISqlValueProvider } from "../../adaptor/SQLQueryAdaptor";
import { SQLDialect } from "./SQLQuery";
import { SchemaVersionId } from "@airport/traffic-pattern/lib/ddl/schema/SchemaVersion";
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
    protected airportDb: IAirportDatabase;
    protected utils: IUtils;
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
    constructor(airportDb: IAirportDatabase, utils: IUtils, dbEntity: DbEntity, dialect: SQLDialect);
    getParameters(parameterMap: {
        [alias: string]: Parameter;
    }, valuesArray?: (boolean | Date | number | string)[]): any[];
    protected getWHEREFragment(operation: JSONBaseOperation, nestingPrefix: string): string;
    private getLogicalWhereFragment;
    protected getEntityPropertyColumnName(qEntity: IQEntityInternal, columnIndex: number): string;
    protected addFieldFromColumn(dbColumn: DbColumn): void;
    protected addField(schemaVersionId: SchemaVersionId, tableIndex: TableIndex, columnIndex: ColumnIndex): void;
    protected warn(warning: string): void;
    getFunctionCallValue(rawValue: any): string;
    getFieldFunctionValue(aField: JSONClauseField, defaultCallback?: () => string): string;
    getFieldValue(clauseField: JSONClauseObject | JSONClauseField[] | JsonFieldQuery, clauseType: ClauseType, defaultCallback?: () => string): string;
    private isParameterReference;
    protected getSimpleColumnFragment(tableAlias: string, columnName: string): string;
    protected getComplexColumnFragment(value: JSONClauseField, columnName: string): string;
    protected getEntityManyToOneColumnName(qEntity: IQEntityInternal, columnIndex: number): string;
    applyOperator(operator: SqlOperator, rValue: string): string;
}
