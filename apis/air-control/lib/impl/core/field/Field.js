"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Relation_1 = require("../entity/Relation");
const FieldInOrderBy_1 = require("./FieldInOrderBy");
/**
 * Created by Papa on 4/21/2016.
 */
class QField {
    constructor(dbColumn, dbProperty, q, objectType) {
        this.dbColumn = dbColumn;
        this.dbProperty = dbProperty;
        this.q = q;
        this.objectType = objectType;
        this.__appliedFunctions__ = [];
    }
    /**
     protected getFieldKey() {
        let rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.parentQ.getRootJoinEntity());
        let key = `${QRelation.getPositionAlias(rootEntityPrefix, this.parentQ.fromClausePosition)}.${this.fieldName}`;
        return key;
    }
     */
    asc() {
        return new FieldInOrderBy_1.FieldInOrderBy(this, ground_control_1.SortOrder.ASCENDING);
    }
    desc() {
        return new FieldInOrderBy_1.FieldInOrderBy(this, ground_control_1.SortOrder.DESCENDING);
    }
    applySqlFunction(sqlFunctionCall) {
        let appliedField = this.getInstance();
        appliedField.__appliedFunctions__.push(sqlFunctionCall);
        return appliedField;
    }
    addSubQuery(subQuery) {
        let appliedField = this.getInstance();
        appliedField.__fieldSubQuery__ = subQuery;
        return appliedField;
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let alias;
        if (forSelectClause) {
            alias = columnAliases.getNextAlias(this);
        }
        let rootEntityPrefix;
        if (this.__fieldSubQuery__) {
            rootEntityPrefix = columnAliases.entityAliases.getOnlyAlias();
        }
        else {
            rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.q.__driver__.getRootJoinEntity());
        }
        let jsonField = {
            af: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases, queryUtils, fieldUtils),
            si: this.dbProperty.entity.schemaVersion.id,
            ti: this.dbProperty.entity.index,
            fa: alias,
            pi: this.dbProperty.index,
            ci: this.dbColumn.index,
            ta: Relation_1.QRelation.getPositionAlias(rootEntityPrefix, this.q.__driver__.fromClausePosition),
            ot: this.objectType,
            dt: this.dbColumn.type
        };
        if (this.__fieldSubQuery__) {
            jsonField.fsq = fieldUtils.getFieldQueryJson(this.__fieldSubQuery__, columnAliases.entityAliases, queryUtils);
            jsonField.ot = ground_control_1.JSONClauseObjectType.FIELD_QUERY;
        }
        return jsonField;
    }
    operableFunctionToJson(functionObject, columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let alias;
        if (forSelectClause) {
            alias = columnAliases.getNextAlias(this);
        }
        return {
            af: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases, queryUtils, fieldUtils),
            fa: alias,
            ot: this.objectType,
            dt: this.dbColumn.type,
            v: this.valueToJSON(functionObject, columnAliases, false, queryUtils, fieldUtils)
        };
    }
    copyFunctions(field) {
        field.__appliedFunctions__ = this.__appliedFunctions__.slice();
        return field;
    }
    appliedFunctionsToJson(appliedFunctions, columnAliases, queryUtils, fieldUtils) {
        if (!appliedFunctions) {
            return appliedFunctions;
        }
        return appliedFunctions.map((appliedFunction) => {
            return this.functionCallToJson(appliedFunction, columnAliases, queryUtils, fieldUtils);
        });
    }
    functionCallToJson(functionCall, columnAliases, queryUtils, fieldUtils) {
        let parameters;
        if (functionCall.p) {
            parameters = functionCall.p.map((parameter) => {
                return this.valueToJSON(parameter, columnAliases, false, queryUtils, fieldUtils);
            });
        }
        return {
            ft: functionCall.ft,
            p: parameters
        };
    }
    valueToJSON(functionObject, columnAliases, forSelectClause, queryUtils, fieldUtils) {
        if (!functionObject) {
            throw new Error(`Function object must be provided to valueToJSON function.`);
        }
        if (functionObject instanceof QField) {
            return functionObject.toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils);
        }
        let value = functionObject.value;
        switch (typeof value) {
            case 'boolean':
            case 'number':
            case 'string':
                return columnAliases.entityAliases.getParams().getNextAlias(functionObject);
            case 'undefined':
                throw new Error(`Undefined is not allowed as a query parameter`);
        }
        if (value === null) {
            return columnAliases.entityAliases.getParams().getNextAlias(functionObject);
        }
        if (value instanceof Date) {
            return columnAliases.entityAliases.getParams().getNextAlias(functionObject);
        }
        if (value instanceof QField) {
            return value.toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils);
        }
        // must be a field sub-query
        let rawFieldQuery = value;
        return fieldUtils.getFieldQueryJson(rawFieldQuery, columnAliases.entityAliases, queryUtils);
    }
}
exports.QField = QField;
//# sourceMappingURL=Field.js.map