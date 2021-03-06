import { JSONClauseObjectType, SortOrder } from '@airport/ground-control';
import { FieldInOrderBy } from './FieldInOrderBy';
/**
 * Created by Papa on 4/21/2016.
 */
export class QField {
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
        let key = `${relationManager.getPositionAlias(rootEntityPrefix, this.parentQ.fromClausePosition)}.${this.fieldName}`;
        return key;
    }
     */
    applySqlFunction(sqlFunctionCall) {
        let appliedField = this.getInstance();
        appliedField.__appliedFunctions__.push(sqlFunctionCall);
        return appliedField;
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
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
            appliedFunctions: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases, queryUtils, fieldUtils, relationManager),
            si: this.dbProperty.entity.applicationVersion._localId,
            ti: this.dbProperty.entity.index,
            fa: alias,
            pi: this.dbProperty.index,
            ci: this.dbColumn.index,
            ta: relationManager.getPositionAlias(rootEntityPrefix, this.q.__driver__.fromClausePosition),
            ot: this.objectType,
            dt: this.dbColumn.type
        };
        if (this.__fieldSubQuery__) {
            jsonField.fieldSubQuery = fieldUtils.getFieldQueryJson(this.__fieldSubQuery__, columnAliases.entityAliases, queryUtils);
            jsonField.ot = JSONClauseObjectType.FIELD_QUERY;
        }
        return jsonField;
    }
    asc() {
        return new FieldInOrderBy(this, SortOrder.ASCENDING);
    }
    desc() {
        return new FieldInOrderBy(this, SortOrder.DESCENDING);
    }
    addSubQuery(subQuery) {
        let appliedField = this.getInstance();
        appliedField.__fieldSubQuery__ = subQuery;
        return appliedField;
    }
    operableFunctionToJson(functionObject, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let alias;
        if (forSelectClause) {
            alias = columnAliases.getNextAlias(this);
        }
        return {
            appliedFunctions: this.appliedFunctionsToJson(this.__appliedFunctions__, columnAliases, queryUtils, fieldUtils, relationManager),
            fa: alias,
            ot: this.objectType,
            dt: this.dbColumn.type,
            v: this.valueToJSON(functionObject, columnAliases, false, true, queryUtils, fieldUtils, relationManager)
        };
    }
    copyFunctions(field) {
        field.__appliedFunctions__ = this.__appliedFunctions__.slice();
        return field;
    }
    appliedFunctionsToJson(appliedFunctions, columnAliases, queryUtils, fieldUtils, relationManager) {
        if (!appliedFunctions) {
            return appliedFunctions;
        }
        return appliedFunctions.map((appliedFunction) => {
            return this.functionCallToJson(appliedFunction, columnAliases, queryUtils, fieldUtils, relationManager);
        });
    }
    functionCallToJson(functionCall, columnAliases, queryUtils, fieldUtils, relationManager) {
        let parameters;
        if (functionCall.p) {
            parameters = functionCall.p.map((parameter) => {
                return this.valueToJSON(parameter, columnAliases, false, false, queryUtils, fieldUtils, relationManager);
            });
        }
        return {
            ft: functionCall.ft,
            p: parameters
        };
    }
    valueToJSON(functionObject, columnAliases, forSelectClause, fromFunctionObject, queryUtils, fieldUtils, relationManager) {
        if (!functionObject) {
            throw new Error(`Function object must be provided to valueToJSON function.`);
        }
        if (!fromFunctionObject && functionObject instanceof QField) {
            return functionObject.toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
        }
        let value = functionObject.value;
        switch (typeof value) {
            case 'boolean':
            case 'number':
            case 'string':
                return columnAliases.entityAliases.getParams()
                    .getNextAlias(functionObject);
            case 'object':
                if (value instanceof Date) {
                    return columnAliases.entityAliases.getParams()
                        .getNextAlias(functionObject);
                }
                else if (value instanceof Array) {
                    return columnAliases.entityAliases.getParams()
                        .getNextAlias(functionObject);
                }
                else if (value === null) {
                    return columnAliases.entityAliases.getParams()
                        .getNextAlias(functionObject);
                }
                else {
                    throw new Error(`Unexpected query parameter type allowed types are:
boolean | Date | Date[] | number | number[] | string | string[]
`);
                }
            case 'undefined':
                throw new Error(`Undefined is not allowed as a query parameter`);
            default:
                throw new Error(`Unexpected query parameter type allowed types are:
boolean | Date | Date[] | number | number[] | string | string[]
`);
        }
        // TODO: this never gets called, is this needed?
        /*
        if (value === null || value instanceof Date) {
            return columnAliases.entityAliases.getParams()
                .getNextAlias(functionObject as IQFunction<any>)
        }
        if (value instanceof QField) {
            return value.toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager)
        }
        // must be a field sub-query
        let rawFieldQuery: RawFieldQuery<any> = value
        return fieldUtils.getFieldQueryJson(
            rawFieldQuery, columnAliases.entityAliases, queryUtils)
         */
    }
}
//# sourceMappingURL=Field.js.map