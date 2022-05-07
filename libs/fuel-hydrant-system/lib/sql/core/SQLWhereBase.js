var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { JSONClauseObjectType, OperationCategory, ApplicationMap, SqlOperator } from '@airport/ground-control';
/**
 * Created by Papa on 10/2/2016.
 */
export var ClauseType;
(function (ClauseType) {
    ClauseType["MAPPED_SELECT_CLAUSE"] = "MAPPED_SELECT_CLAUSE";
    ClauseType["NON_MAPPED_SELECT_CLAUSE"] = "NON_MAPPED_SELECT_CLAUSE";
    ClauseType["WHERE_CLAUSE"] = "WHERE_CLAUSE";
    ClauseType["FUNCTION_CALL"] = "FUNCTION_CALL";
})(ClauseType || (ClauseType = {}));
let SQLWhereBase = class SQLWhereBase {
    constructor(dbEntity, dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, sqlQueryAdapter, storeDriver, utils, context) {
        this.dbEntity = dbEntity;
        this.dialect = dialect;
        this.airportDatabase = airportDatabase;
        this.applicationUtils = applicationUtils;
        this.entityStateManager = entityStateManager;
        this.qMetadataUtils = qMetadataUtils;
        this.sqlQueryAdapter = sqlQueryAdapter;
        this.storeDriver = storeDriver;
        this.utils = utils;
        this.context = context;
        this.parameterReferences = [];
        this.fieldMap = new ApplicationMap();
        this.qEntityMapByAlias = {};
        this.jsonRelationMapByAlias = {};
    }
    getParameters(parameterMap, //,
    context) {
        // let populatedParameterMap: {[parameterAlias: string]: boolean} = {};
        return this.parameterReferences
            /*
             .parameterReferences.filter(( parameterReference ) => {
             if (!populatedParameterMap[parameterReference]) {
             populatedParameterMap[parameterReference] = true;
             return true;
             }
             return false;
             })
             */
            .map((parameterReference) => {
            let parameter = parameterMap[parameterReference];
            if (!parameter) {
                const isReference = parameterReference === null || ['number', 'string'].indexOf(typeof parameterReference) > -1;
                if (isReference) {
                    // if (!valuesArray) {
                    return parameterReference;
                    // } else if (typeof parameterReference === 'number') {
                    // 	return sqlAdaptor.getValue(valuesArray[parameterReference])
                    // }
                }
                throw new Error(`No parameter found for alias '${parameterReference}'`);
            }
            return this.sqlQueryAdapter.getParameterValue(parameter);
        });
    }
    getFunctionCallValue(rawValue, context) {
        return this.getFieldValue(rawValue, ClauseType.FUNCTION_CALL, null, context);
    }
    getFieldFunctionValue(aField, defaultCallback, context) {
        let aValue = aField.v;
        if (this.isParameterReference(aValue)) {
            let stringValue = aValue;
            this.parameterReferences.push(stringValue);
            aValue = this.sqlQueryAdapter.getParameterReference(this.parameterReferences, stringValue);
        }
        else {
            aValue = this.getFieldValue(aValue, ClauseType.FUNCTION_CALL, defaultCallback, context);
        }
        aValue = this.sqlQueryAdapter.getFunctionAdaptor()
            .getFunctionCalls(aField, aValue, this.qEntityMapByAlias, this, context);
        this.validator.addFunctionAlias(aField.fa);
        return aValue;
    }
    getFieldValue(clauseField, clauseType, defaultCallback, context) {
        let columnName;
        if (!clauseField) {
            throw new Error(`Missing Clause Field definition`);
        }
        if (clauseField instanceof Array) {
            return clauseField
                .map((clauseFieldMember) => this.getFieldValue(clauseFieldMember, clauseType, defaultCallback, context))
                .join(', ');
        }
        if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE && !clauseField.ot) {
            throw new Error(`Object Type is not defined in JSONClauseField`);
        }
        const aField = clauseField;
        let qEntity;
        switch (clauseField.ot) {
            case JSONClauseObjectType.FIELD_FUNCTION:
                return this.getFieldFunctionValue(aField, defaultCallback, context);
            case JSONClauseObjectType.DISTINCT_FUNCTION:
                throw new Error(`Distinct function cannot be nested.`);
            case JSONClauseObjectType.EXISTS_FUNCTION: {
                if (clauseType !== ClauseType.WHERE_CLAUSE) {
                    throw new Error(`Exists can only be used as a top function in a WHERE clause.`);
                }
                const { parameterReferences, subQuerySql } = this.subStatementSqlGenerator.getTreeQuerySql(aField.v, this.dialect, context);
                if (parameterReferences.length) {
                    this.parameterReferences = this.parameterReferences.concat(parameterReferences);
                }
                return `EXISTS(${subQuerySql})`;
            }
            case JSONClauseObjectType.FIELD: {
                qEntity = this.qEntityMapByAlias[aField.ta];
                this.validator.validateReadQEntityProperty(aField.si, aField.ti, aField.ci);
                columnName = this.getEntityPropertyColumnName(qEntity, aField.ci, context);
                this.addField(aField.si, aField.ti, aField.ci);
                return this.getComplexColumnFragment(aField, columnName, context);
            }
            case JSONClauseObjectType.FIELD_QUERY: {
                let jsonFieldSqlSubQuery = aField.fieldSubQuery;
                if (aField.S) {
                    jsonFieldSqlSubQuery = aField;
                }
                const { parameterReferences, subQuerySql } = this.subStatementSqlGenerator.getFieldQuerySql(jsonFieldSqlSubQuery, this.dialect, this.qEntityMapByAlias, context);
                if (parameterReferences.length) {
                    this.parameterReferences = this.parameterReferences.concat(parameterReferences);
                }
                this.validator.addSubQueryAlias(aField.fa);
                return `(${subQuerySql})`;
            }
            case JSONClauseObjectType.MANY_TO_ONE_RELATION: {
                qEntity = this.qEntityMapByAlias[aField.ta];
                this.validator.validateReadQEntityManyToOneRelation(aField.si, aField.ti, aField.ci);
                columnName = this.getEntityManyToOneColumnName(qEntity, aField.ci, context);
                this.addField(aField.si, aField.ti, aField.ci);
                return this.getComplexColumnFragment(aField, columnName, context);
            }
            // must be a nested object
            default: {
                if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE) {
                    `Nested objects only allowed in the mapped SELECT clause.`;
                }
                return defaultCallback();
            }
        }
    }
    applyOperator(operator, rValue) {
        switch (operator) {
            case SqlOperator.EQUALS:
                return ` = ${rValue}`;
            case SqlOperator.GREATER_THAN:
                return ` > ${rValue}`;
            case SqlOperator.GREATER_THAN_OR_EQUALS:
                return ` >= ${rValue}`;
            case SqlOperator.IS_NOT_NULL:
                return ` IS NOT NULL`;
            case SqlOperator.IS_NULL:
                return ` IS NULL`;
            case SqlOperator.IN:
                return ` IN (${rValue})`;
            case SqlOperator.LESS_THAN:
                return ` < ${rValue}`;
            case SqlOperator.LESS_THAN_OR_EQUALS:
                return ` <= ${rValue}`;
            case SqlOperator.NOT_EQUALS:
                return ` != ${rValue}`;
            case SqlOperator.NOT_IN:
                return ` NOT IN (${rValue})`;
            case SqlOperator.LIKE:
                return ` LIKE ${rValue}`;
            default:
                throw new Error(`Unsupported operator ${operator}`);
        }
    }
    getWHEREFragment(operation, nestingPrefix, context) {
        let whereFragment = '';
        if (!operation) {
            throw new Error(`An operation is missing in WHERE or HAVING clause`);
        }
        nestingPrefix = `${nestingPrefix}\t`;
        switch (operation.c) {
            case OperationCategory.LOGICAL:
                return this.getLogicalWhereFragment(operation, nestingPrefix, context);
            case OperationCategory.BOOLEAN:
            case OperationCategory.DATE:
            case OperationCategory.NUMBER:
            case OperationCategory.STRING:
            case OperationCategory.UNTYPED:
                let valueOperation = operation;
                let lValueSql = this.getFieldValue(valueOperation.l, ClauseType.WHERE_CLAUSE, null, context);
                let rValueSql = this.getFieldValue(valueOperation.r, ClauseType.WHERE_CLAUSE, null, context);
                let rValueWithOperator = this.applyOperator(valueOperation.o, rValueSql);
                whereFragment += `${lValueSql}${rValueWithOperator}`;
                break;
            case OperationCategory.FUNCTION:
                let functionOperation = operation;
                whereFragment = this.getFieldValue(functionOperation.ob, ClauseType.WHERE_CLAUSE, null, context);
                // exists function and maybe others
                break;
        }
        return whereFragment;
    }
    getEntityPropertyColumnName(qEntity, columnIndex, context) {
        const dbEntity = this.qMetadataUtils.getDbEntity(qEntity);
        return dbEntity.columns[columnIndex].name;
    }
    addFieldFromColumn(dbColumn) {
        const dbEntity = dbColumn.propertyColumns[0].property.entity;
        this.addField(dbEntity.applicationVersion.id, dbEntity.index, dbColumn.index);
    }
    addField(applicationIndex, tableIndex, columnIndex) {
        this.fieldMap.ensure(applicationIndex, tableIndex)
            .ensure(columnIndex);
    }
    warn(warning) {
        console.log(warning);
    }
    getSimpleColumnFragment(tableAlias, columnName) {
        return `${tableAlias}.${columnName}`;
    }
    getComplexColumnFragment(value, columnName, context) {
        let selectSqlFragment = `${value.ta}.${columnName}`;
        selectSqlFragment = this.sqlQueryAdapter.getFunctionAdaptor()
            .getFunctionCalls(value, selectSqlFragment, this.qEntityMapByAlias, this, context);
        return selectSqlFragment;
    }
    getEntityManyToOneColumnName(qEntity, columnIndex, context) {
        return this.getEntityPropertyColumnName(qEntity, columnIndex, context);
    }
    getLogicalWhereFragment(operation, nestingPrefix, context) {
        let operator;
        switch (operation.o) {
            case SqlOperator.AND:
                operator = 'AND';
                break;
            case SqlOperator.OR:
                operator = 'OR';
                break;
            case SqlOperator.NOT:
                const whereFragment = this.getWHEREFragment(operation.v, nestingPrefix, context);
                return ` NOT (${whereFragment})`;
            default:
                throw new Error(`Unknown logical operator: ${operation.o}`);
        }
        let childOperations = operation.v;
        if (!(childOperations instanceof Array)) {
            throw new Error(`Expecting an array of child operations as a value for operator ${operator}, 
				in the WHERE Clause.`);
        }
        let whereFragment = childOperations.map((childOperation) => {
            return this.getWHEREFragment(childOperation, nestingPrefix, context);
        })
            .join(`\n${nestingPrefix}${operator} `);
        return `( ${whereFragment} )`;
    }
    isParameterReference(value) {
        if (value === null) {
            return false;
        }
        if (value === undefined || value === '' || value === NaN) {
            throw new Error(`Invalid query value: ${value}`);
        }
        switch (typeof value) {
            case 'boolean':
            case 'number':
                throw new Error(`Unexpected primitive instance, expecting parameter alias.`);
            case 'string':
                return true;
        }
        if (value instanceof Date) {
            throw new Error(`Unexpected date instance, expecting parameter alias.`);
        }
        return false;
    }
};
__decorate([
    Inject()
], SQLWhereBase.prototype, "validator", void 0);
__decorate([
    Inject()
], SQLWhereBase.prototype, "subStatementSqlGenerator", void 0);
SQLWhereBase = __decorate([
    Injected()
], SQLWhereBase);
export { SQLWhereBase };
//# sourceMappingURL=SQLWhereBase.js.map