"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./entity/Entity");
const Field_1 = require("./field/Field");
/**
 * Created by Papa on 10/25/2016.
 */
function tree(query) {
    let queryDefinition;
    if (query instanceof Function) {
        queryDefinition = query();
    }
    else {
        queryDefinition = query;
    }
    let view = new Entity_1.QTree([], queryDefinition);
    let customEntity = queryDefinition.select;
    view = convertMappedEntitySelect(customEntity, queryDefinition, view, view, 'f');
    return view;
}
exports.tree = tree;
function convertMappedEntitySelect(customEntity, queryDefinition, view, selectProxy, fieldPrefix) {
    let fieldIndex = 0;
    for (let property in customEntity) {
        let alias = `${fieldPrefix}${++fieldIndex}`;
        let value = customEntity[property];
        if (value instanceof Field_1.QField) {
            let field = value.getInstance(view);
            field.alias = alias;
            field.q = view;
            selectProxy[property] = field;
        }
        else {
            if (value instanceof Object && !(value instanceof Date)) {
                selectProxy[value] = convertMappedEntitySelect(value, queryDefinition, view, {}, `${alias}_`);
            }
            else {
                throw new Error(`All SELECT clause entries of a Mapped query must be Fields or Functions`);
            }
        }
    }
    return view;
}
/**
 * Sub-queries in select clause
 * @param query
 * @returns {IQF}
 */
function field(query) {
    let queryDefinition;
    if (query instanceof Function) {
        queryDefinition = query();
    }
    else {
        queryDefinition = query;
    }
    let customField = queryDefinition.select;
    customField = customField.addSubQuery(queryDefinition);
    // Field query cannot be joined to any other query so don't have set the positional fields
    return customField;
}
exports.field = field;
class JoinFields {
    constructor(joinTo) {
        this.joinTo = joinTo;
        if (!(this.joinTo instanceof Entity_1.QEntity)) {
            throw new Error(`Right value in join must be a View or an Entity`);
        }
    }
    on(joinOperation) {
        let joinChild = this.joinTo;
        joinChild.__driver__.joinWhereClause = joinOperation(this.joinTo);
        return this.joinTo;
    }
}
exports.JoinFields = JoinFields;
//# sourceMappingURL=Joins.js.map