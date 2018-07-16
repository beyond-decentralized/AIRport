import { QEntity, QTree } from "./entity/Entity";
import { QField } from "./field/Field";
/**
 * Created by Papa on 10/25/2016.
 */
export function tree(query) {
    let queryDefinition;
    if (query instanceof Function) {
        queryDefinition = query();
    }
    else {
        queryDefinition = query;
    }
    let view = new QTree([], queryDefinition);
    let customEntity = queryDefinition.select;
    view = convertMappedEntitySelect(customEntity, queryDefinition, view, view, 'f');
    return view;
}
function convertMappedEntitySelect(customEntity, queryDefinition, view, selectProxy, fieldPrefix) {
    let fieldIndex = 0;
    for (let property in customEntity) {
        let alias = `${fieldPrefix}${++fieldIndex}`;
        let value = customEntity[property];
        if (value instanceof QField) {
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
                throw `All SELECT clause entries of a Mapped query must be Fields or Functions`;
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
export function field(query) {
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
export class JoinFields {
    constructor(joinTo) {
        this.joinTo = joinTo;
        if (!(this.joinTo instanceof QEntity)) {
            throw `Right value in join must be a View or an Entity`;
        }
    }
    on(joinOperation) {
        let joinChild = this.joinTo;
        joinChild.__driver__.joinWhereClause = joinOperation(this.joinTo);
        return this.joinTo;
    }
}
//# sourceMappingURL=Joins.js.map