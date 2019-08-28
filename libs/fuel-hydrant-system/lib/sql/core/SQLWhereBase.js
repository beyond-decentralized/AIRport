"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const SQLQueryAdaptor_1 = require("../../adaptor/SQLQueryAdaptor");
const Validator_1 = require("../../validation/Validator");
/**
 * Created by Papa on 10/2/2016.
 */
var ClauseType;
(function (ClauseType) {
    ClauseType[ClauseType["MAPPED_SELECT_CLAUSE"] = 0] = "MAPPED_SELECT_CLAUSE";
    ClauseType[ClauseType["NON_MAPPED_SELECT_CLAUSE"] = 1] = "NON_MAPPED_SELECT_CLAUSE";
    ClauseType[ClauseType["WHERE_CLAUSE"] = 2] = "WHERE_CLAUSE";
    ClauseType[ClauseType["FUNCTION_CALL"] = 3] = "FUNCTION_CALL";
})(ClauseType = exports.ClauseType || (exports.ClauseType = {}));
class SQLWhereBase {
    constructor(dbEntity, dialect, storeDriver) {
        this.dbEntity = dbEntity;
        this.dialect = dialect;
        this.storeDriver = storeDriver;
        this.fieldMap = new ground_control_1.SchemaMap();
        this.qEntityMapByAlias = {};
        this.jsonRelationMapByAlias = {};
        this.parameterReferences = [];
        this.sqlAdaptor = SQLQueryAdaptor_1.getSQLAdaptor(this, dialect);
        this.validator = Validator_1.getValidator(dbEntity);
    }
    getParameters(parameterMap //,
    // valuesArray: (boolean | Date | number | string)[] = null
    ) {
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
                    // 	return this.sqlAdaptor.getValue(valuesArray[parameterReference])
                    // }
                }
                throw new Error(`No parameter found for alias '${parameterReference}'`);
            }
            return this.sqlAdaptor.getParameterValue(parameter);
        });
    }
    getWHEREFragment(operation, nestingPrefix, airDb, schemaUtils, metadataUtils) {
        let whereFragment = '';
        if (!operation) {
            throw new Error(`An operation is missing in WHERE or HAVING clause`);
        }
        nestingPrefix = `${nestingPrefix}\t`;
        switch (operation.c) {
            case ground_control_1.OperationCategory.LOGICAL:
                return this.getLogicalWhereFragment(operation, nestingPrefix, airDb, schemaUtils, metadataUtils);
            case ground_control_1.OperationCategory.BOOLEAN:
            case ground_control_1.OperationCategory.DATE:
            case ground_control_1.OperationCategory.NUMBER:
            case ground_control_1.OperationCategory.STRING:
            case ground_control_1.OperationCategory.UNTYPED:
                let valueOperation = operation;
                let lValueSql = this.getFieldValue(valueOperation.l, ClauseType.WHERE_CLAUSE, null, airDb, schemaUtils, metadataUtils);
                let rValueSql = this.getFieldValue(valueOperation.r, ClauseType.WHERE_CLAUSE, null, airDb, schemaUtils, metadataUtils);
                let rValueWithOperator = this.applyOperator(valueOperation.o, rValueSql);
                whereFragment += `${lValueSql}${rValueWithOperator}`;
                break;
            case ground_control_1.OperationCategory.FUNCTION:
                let functionOperation = operation;
                whereFragment = this.getFieldValue(functionOperation.ob, ClauseType.WHERE_CLAUSE, null, airDb, schemaUtils, metadataUtils);
                // exists function and maybe others
                break;
        }
        return whereFragment;
    }
    getLogicalWhereFragment(operation, nestingPrefix, airDb, schemaUtils, metadataUtils) {
        let operator;
        switch (operation.o) {
            case ground_control_1.SqlOperator.AND:
                operator = 'AND';
                break;
            case ground_control_1.SqlOperator.OR:
                operator = 'OR';
                break;
            case ground_control_1.SqlOperator.NOT:
                const whereFragment = this.getWHEREFragment(operation.v, nestingPrefix, airDb, schemaUtils, metadataUtils);
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
            return this.getWHEREFragment(childOperation, nestingPrefix, airDb, schemaUtils, metadataUtils);
        }).join(`\n${nestingPrefix}${operator} `);
        return `( ${whereFragment} )`;
    }
    getEntityPropertyColumnName(qEntity, columnIndex, metadataUtils) {
        const dbEntity = metadataUtils.getDbEntity(qEntity);
        return dbEntity.columns[columnIndex].name;
    }
    addFieldFromColumn(dbColumn) {
        const dbEntity = dbColumn.propertyColumns[0].property.entity;
        this.addField(dbEntity.schemaVersion.id, dbEntity.index, dbColumn.index);
    }
    addField(schemaVersionId, tableIndex, columnIndex) {
        this.fieldMap.ensure(schemaVersionId, tableIndex).ensure(columnIndex);
    }
    warn(warning) {
        console.log(warning);
    }
    getFunctionCallValue(rawValue, airDb, schemaUtils, metadataUtils) {
        return this.getFieldValue(rawValue, ClauseType.FUNCTION_CALL, null, airDb, schemaUtils, metadataUtils);
    }
    getFieldFunctionValue(aField, defaultCallback, airDb, schemaUtils, metadataUtils) {
        let aValue = aField.v;
        if (this.isParameterReference(aValue)) {
            let stringValue = aValue;
            this.parameterReferences.push(stringValue);
            aValue = this.sqlAdaptor.getParameterReference(this.parameterReferences, stringValue);
        }
        else {
            aValue = this.getFieldValue(aValue, ClauseType.FUNCTION_CALL, defaultCallback, airDb, schemaUtils, metadataUtils);
        }
        aValue = this.sqlAdaptor.getFunctionAdaptor().getFunctionCalls(aField, aValue, this.qEntityMapByAlias, airDb, schemaUtils, metadataUtils);
        this.validator.addFunctionAlias(aField.fa);
        return aValue;
    }
    getFieldValue(clauseField, clauseType, defaultCallback, airDb, schemaUtils, metadataUtils) {
        let columnName;
        if (!clauseField) {
            throw new Error(`Missing Clause Field definition`);
        }
        if (clauseField instanceof Array) {
            return clauseField
                .map((clauseFieldMember) => this.getFieldValue(clauseFieldMember, clauseType, defaultCallback, airDb, schemaUtils, metadataUtils))
                .join(', ');
        }
        if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE && !clauseField.ot && clauseField.ot !== 0) {
            throw new Error(`Object Type is not defined in JSONClauseField`);
        }
        const aField = clauseField;
        let qEntity;
        switch (clauseField.ot) {
            case ground_control_1.JSONClauseObjectType.FIELD_FUNCTION:
                return this.getFieldFunctionValue(aField, defaultCallback, airDb, schemaUtils, metadataUtils);
            case ground_control_1.JSONClauseObjectType.DISTINCT_FUNCTION:
                throw new Error(`Distinct function cannot be nested.`);
            case ground_control_1.JSONClauseObjectType.EXISTS_FUNCTION:
                if (clauseType !== ClauseType.WHERE_CLAUSE) {
                    throw new Error(`Exists can only be used as a top function in a WHERE clause.`);
                }
                let TreeSQLQueryClass = require('../TreeSQLQuery').TreeSQLQuery;
                let mappedSqlQuery = new TreeSQLQueryClass(aField.v, this.dialect, this.storeDriver);
                return `EXISTS(${mappedSqlQuery.toSQL(airDb, schemaUtils, metadataUtils)})`;
            case ground_control_1.JSONClauseObjectType.FIELD:
                qEntity = this.qEntityMapByAlias[aField.ta];
                this.validator.validateReadQEntityProperty(aField.si, aField.ti, aField.ci);
                columnName = this.getEntityPropertyColumnName(qEntity, aField.ci, metadataUtils);
                this.addField(aField.si, aField.ti, aField.ci);
                return this.getComplexColumnFragment(aField, columnName, airDb, schemaUtils, metadataUtils);
            case ground_control_1.JSONClauseObjectType.FIELD_QUERY:
                let jsonFieldSqlSubQuery = aField.fsq;
                if (aField.S) {
                    jsonFieldSqlSubQuery = aField;
                }
                let FieldSQLQueryClass = require('../FieldSQLQuery').FieldSQLQuery;
                let fieldSqlQuery = new FieldSQLQueryClass(jsonFieldSqlSubQuery, this.dialect, this.storeDriver);
                fieldSqlQuery.addQEntityMapByAlias(this.qEntityMapByAlias);
                this.validator.addSubQueryAlias(aField.fa);
                return `(${fieldSqlQuery.toSQL(airDb, schemaUtils, metadataUtils)})`;
            case ground_control_1.JSONClauseObjectType.MANY_TO_ONE_RELATION:
                qEntity = this.qEntityMapByAlias[aField.ta];
                this.validator.validateReadQEntityManyToOneRelation(aField.si, aField.ti, aField.ci);
                columnName = this.getEntityManyToOneColumnName(qEntity, aField.ci, metadataUtils);
                this.addField(aField.si, aField.ti, aField.ci);
                return this.getComplexColumnFragment(aField, columnName, airDb, schemaUtils, metadataUtils);
            // must be a nested object
            default:
                if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE) {
                    `Nested objects only allowed in the mapped SELECT clause.`;
                }
                return defaultCallback();
        }
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
    getSimpleColumnFragment(tableAlias, columnName) {
        return `${tableAlias}.${columnName}`;
    }
    getComplexColumnFragment(value, columnName, airDb, schemaUtils, metadataUtils) {
        let selectSqlFragment = `${value.ta}.${columnName}`;
        selectSqlFragment = this.sqlAdaptor.getFunctionAdaptor()
            .getFunctionCalls(value, selectSqlFragment, this.qEntityMapByAlias, airDb, schemaUtils, metadataUtils);
        return selectSqlFragment;
    }
    getEntityManyToOneColumnName(qEntity, columnIndex, metadataUtils) {
        return this.getEntityPropertyColumnName(qEntity, columnIndex, metadataUtils);
    }
    applyOperator(operator, rValue) {
        switch (operator) {
            case ground_control_1.SqlOperator.EQUALS:
                return ` = ${rValue}`;
            case ground_control_1.SqlOperator.GREATER_THAN:
                return ` > ${rValue}`;
            case ground_control_1.SqlOperator.GREATER_THAN_OR_EQUALS:
                return ` >= ${rValue}`;
            case ground_control_1.SqlOperator.IS_NOT_NULL:
                return ` IS NOT NULL`;
            case ground_control_1.SqlOperator.IS_NULL:
                return ` IS NULL`;
            case ground_control_1.SqlOperator.IN:
                return ` IN (${rValue})`;
            case ground_control_1.SqlOperator.LESS_THAN:
                return ` < ${rValue}`;
            case ground_control_1.SqlOperator.LESS_THAN_OR_EQUALS:
                return ` <= ${rValue}`;
            case ground_control_1.SqlOperator.NOT_EQUALS:
                return ` != ${rValue}`;
            case ground_control_1.SqlOperator.NOT_IN:
                return ` NOT IN (${rValue})`;
            case ground_control_1.SqlOperator.LIKE:
                return ` LIKE ${rValue}`;
            default:
                throw new Error(`Unsupported operator ${operator}`);
        }
    }
}
exports.SQLWhereBase = SQLWhereBase;
//# sourceMappingURL=SQLWhereBase.js.map