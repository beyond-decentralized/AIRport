"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Relation_1 = require("../entity/Relation");
const FieldInOrderBy_1 = require("./FieldInOrderBy");
/**
 * Created by Papa on 4/21/2016.
 */
class QField {
    constructor(dbColumn, dbProperty, q, objectType, utils) {
        this.dbColumn = dbColumn;
        this.dbProperty = dbProperty;
        this.q = q;
        this.objectType = objectType;
        this.utils = utils;
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
    toJSON(columnAliases, forSelectClause) {
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
            af: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases),
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
            jsonField.fsq = this.utils.Field.getFieldQueryJson(this.__fieldSubQuery__, columnAliases.entityAliases);
            jsonField.ot = ground_control_1.JSONClauseObjectType.FIELD_QUERY;
        }
        return jsonField;
    }
    operableFunctionToJson(functionObject, columnAliases, forSelectClause) {
        let alias;
        if (forSelectClause) {
            alias = columnAliases.getNextAlias(this);
        }
        return {
            af: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases),
            fa: alias,
            ot: this.objectType,
            dt: this.dbColumn.type,
            v: this.valueToJSON(functionObject, columnAliases, false)
        };
    }
    copyFunctions(field) {
        field.__appliedFunctions__ = this.__appliedFunctions__.slice();
        return field;
    }
    appliedFunctionsToJson(appliedFunctions, columnAliases) {
        if (!appliedFunctions) {
            return appliedFunctions;
        }
        return appliedFunctions.map((appliedFunction) => {
            return this.functionCallToJson(appliedFunction, columnAliases);
        });
    }
    functionCallToJson(functionCall, columnAliases) {
        let parameters;
        if (functionCall.p) {
            parameters = functionCall.p.map((parameter) => {
                return this.valueToJSON(parameter, columnAliases, false);
            });
        }
        return {
            ft: functionCall.ft,
            p: parameters
        };
    }
    valueToJSON(functionObject, columnAliases, forSelectClause) {
        if (!functionObject) {
            throw `Function object must be provided to valueToJSON function.`;
        }
        let value = functionObject.value;
        switch (typeof value) {
            case "boolean":
            case "number":
            case "string":
                return columnAliases.entityAliases.getParams().getNextAlias(functionObject);
            case "undefined":
                throw `Undefined is not allowed as a query parameter`;
        }
        if (value === null) {
            return columnAliases.entityAliases.getParams().getNextAlias(functionObject);
        }
        if (value instanceof Date) {
            return columnAliases.entityAliases.getParams().getNextAlias(functionObject);
        }
        if (value instanceof QField) {
            return value.toJSON(columnAliases, forSelectClause);
        }
        // must be a field sub-query
        let rawFieldQuery = value;
        return this.utils.Field.getFieldQueryJson(rawFieldQuery, columnAliases.entityAliases);
    }
}
exports.QField = QField;
//# sourceMappingURL=Field.js.map