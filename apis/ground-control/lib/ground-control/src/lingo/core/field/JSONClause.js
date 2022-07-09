/**
 * All possible types of serialized JSON clauses.
 */
export var JSONClauseObjectType;
(function (JSONClauseObjectType) {
    JSONClauseObjectType["FIELD"] = "FIELD";
    JSONClauseObjectType["FIELD_FUNCTION"] = "FIELD_FUNCTION";
    JSONClauseObjectType["FIELD_QUERY"] = "FIELD_QUERY";
    JSONClauseObjectType["DISTINCT_FUNCTION"] = "DISTINCT_FUNCTION";
    JSONClauseObjectType["EXISTS_FUNCTION"] = "EXISTS_FUNCTION";
    JSONClauseObjectType["MANY_TO_ONE_RELATION"] = "MANY_TO_ONE_RELATION"; // A many-to-one relation (used in a query)
})(JSONClauseObjectType || (JSONClauseObjectType = {}));
/**
 * Types of data
 */
export var SQLDataType;
(function (SQLDataType) {
    // Allowing ANY allows developers to de-type their data
    SQLDataType["ANY"] = "ANY";
    SQLDataType["BOOLEAN"] = "BOOLEAN";
    SQLDataType["DATE"] = "DATE";
    // Allowing JSON allows developers to de-normalize their data
    SQLDataType["JSON"] = "JSON";
    SQLDataType["NUMBER"] = "NUMBER";
    SQLDataType["STRING"] = "STRING";
})(SQLDataType || (SQLDataType = {}));
export function getSqlDataType(type) {
    switch (type) {
        case 'any':
            return SQLDataType.ANY;
        case 'boolean':
            return SQLDataType.BOOLEAN;
        case 'Date':
            return SQLDataType.DATE;
        case 'Json':
            return SQLDataType.JSON;
        case 'number':
            return SQLDataType.NUMBER;
        case 'string':
            return SQLDataType.STRING;
        default:
            throw new Error(`Uknown type: ${type}`);
    }
}
//# sourceMappingURL=JSONClause.js.map