import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control';
import { ApplicationColumn_Index, DbColumn, DbEntity, JSONBaseOperation, JSONClauseField, JSONClauseObject, JSONEntityRelation, JsonFieldQuery, Application_Index, ApplicationMap, SqlOperator, ApplicationEntity_TableIndex, IEntityStateManager } from '@airport/ground-control';
import { IApplicationUtils, IQEntityInternal, JSONLogicalOperation, Parameter } from '@airport/tarmaq-query';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor, ISqlValueProvider } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { IValidator } from '../../validation/Validator';
import { SQLDialect } from './SQLQuery';
import { ISubStatementSqlGenerator } from './SubStatementSqlGenerator';
/**
 * Created by Papa on 10/2/2016.
 */
export declare enum ClauseType {
    MAPPED_SELECT_CLAUSE = "MAPPED_SELECT_CLAUSE",
    NON_MAPPED_SELECT_CLAUSE = "NON_MAPPED_SELECT_CLAUSE",
    WHERE_CLAUSE = "WHERE_CLAUSE",
    FUNCTION_CALL = "FUNCTION_CALL"
}
export declare abstract class SQLWhereBase implements ISqlValueProvider {
    protected dbEntity: DbEntity;
    protected dialect: SQLDialect;
    protected airportDatabase: IAirportDatabase;
    protected applicationUtils: IApplicationUtils;
    protected entityStateManager: IEntityStateManager;
    protected qMetadataUtils: IQMetadataUtils;
    protected qValidator: IValidator;
    protected sqlQueryAdapter: ISQLQueryAdaptor;
    protected storeDriver: IStoreDriver;
    protected subStatementSqlGenerator: ISubStatementSqlGenerator;
    protected utils: IUtils;
    protected context: IFuelHydrantContext;
    parameterReferences: (string | number)[];
    protected fieldMap: ApplicationMap;
    protected qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal;
    };
    protected jsonRelationMapByAlias: {
        [entityAlias: string]: JSONEntityRelation;
    };
    constructor(dbEntity: DbEntity, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, qValidator: IValidator, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, subStatementSqlGenerator: ISubStatementSqlGenerator, utils: IUtils, context: IFuelHydrantContext);
    getParameters(parameterMap: {
        [alias: string]: Parameter;
    }, //,
    context: IFuelHydrantContext): any[];
    getFunctionCallValue(rawValue: any, context: IFuelHydrantContext): string;
    getFieldFunctionValue(aField: JSONClauseField, defaultCallback: () => string, context: IFuelHydrantContext): string;
    getFieldValue(clauseField: JSONClauseObject | JSONClauseField[] | JsonFieldQuery, clauseType: ClauseType, defaultCallback: () => string, context: IFuelHydrantContext): string;
    applyOperator(operator: SqlOperator, rValue: string): string;
    protected getWHEREFragment(operation: JSONBaseOperation, nestingPrefix: string, context: IFuelHydrantContext): string;
    protected getEntityPropertyColumnName(qEntity: IQEntityInternal, columnIndex: number, context: IFuelHydrantContext): string;
    protected addFieldFromColumn(dbColumn: DbColumn): void;
    protected addField(applicationIndex: Application_Index, tableIndex: ApplicationEntity_TableIndex, columnIndex: ApplicationColumn_Index): void;
    protected warn(warning: string): void;
    protected getSimpleColumnFragment(tableAlias: string, columnName: string): string;
    protected getComplexColumnFragment(value: JSONClauseField, columnName: string, context: IFuelHydrantContext): string;
    protected getEntityManyToOneColumnName(qEntity: IQEntityInternal, columnIndex: number, context: IFuelHydrantContext): string;
    protected getLogicalWhereFragment(operation: JSONLogicalOperation, nestingPrefix: string, context: IFuelHydrantContext): string;
    protected isParameterReference(value: any): boolean;
}
//# sourceMappingURL=SQLWhereBase.d.ts.map