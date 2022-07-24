import { IOC } from '@airport/direction-indicator';
import { ENTITY_UTILS } from '../../tokens';
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
    let view = IOC.getSync(ENTITY_UTILS).getQTree([], queryDefinition);
    let customEntity = queryDefinition.SELECT;
    view = convertMappedEntitySelect(customEntity, queryDefinition, view, view, 'f');
    return view;
}
function convertMappedEntitySelect(customEntity, queryDefinition, view, selectProxy, fieldPrefix) {
    let fieldIndex = 0;
    for (let property in customEntity) {
        let alias = `${fieldPrefix}${++fieldIndex}`;
        let value = customEntity[property];
        if (IOC.getSync(ENTITY_UTILS).isQField(value)) {
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
 * Sub-queries in SELECT clause
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
    let customField = queryDefinition.SELECT;
    customField = customField.addSubQuery(queryDefinition);
    // Field query cannot be joined to any other query so don't have set the positional fields
    return customField;
}
export class JoinFields {
    constructor(joinTo) {
        this.joinTo = joinTo;
        if (!(IOC.getSync(ENTITY_UTILS).isQEntity(this.joinTo))) {
            throw new Error(`Right value in join must be a View or an Entity`);
        }
    }
    on(joinOperation) {
        let joinChild = this.joinTo;
        joinChild.__driver__.joinWhereClause = joinOperation(this.joinTo);
        return this.joinTo;
    }
}
//# sourceMappingURL=Joins.js.map