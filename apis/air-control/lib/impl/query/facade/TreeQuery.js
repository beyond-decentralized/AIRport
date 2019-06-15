"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aliases_1 = require("../../core/entity/Aliases");
const OneToManyRelation_1 = require("../../core/entity/OneToManyRelation");
const Field_1 = require("../../core/field/Field");
const NonEntityQuery_1 = require("./NonEntityQuery");
/**
 * Created by Papa on 10/24/2016.
 */
exports.FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE = `Entity SELECT clauses can only contain fields assigned: null | undefined | boolean | Date | number | string | Relation SELECT`;
/**
 * A query whose select facade is a collection of properties.
 */
class MappableQuery extends NonEntityQuery_1.DistinguishableQuery {
    nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils) {
        let select = {};
        for (let property in rawSelect) {
            let value = rawSelect[property];
            if (value instanceof Field_1.QField) {
                if (this.isEntityQuery) {
                    throw exports.FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE;
                }
                // The same value may appear in the select clause more than once.
                // In that case the last one will set the alias for all of them.
                // Because the alias only matters for GROUP BY and ORDER BY
                // that is OK.
                select[property] = value.toJSON(this.columnAliases, true, queryUtils, fieldUtils);
            }
            else if (value instanceof OneToManyRelation_1.QOneToManyRelation) {
                throw `@OneToMany relation objects can cannot be used in SELECT clauses`;
            } // Must be a primitive
            else {
                let isChildObject = false;
                try {
                    // Must be an entity query here
                    switch (typeof value) {
                        case 'boolean':
                        case 'number':
                        case 'string':
                        case 'undefined':
                            continue;
                        case 'object':
                            if (value instanceof Date) {
                            }
                            else if (value === null) {
                            }
                            else {
                                isChildObject = true;
                                select[property] = this.nonDistinctSelectClauseToJSON(value, queryUtils, fieldUtils);
                            }
                    }
                }
                finally {
                    if (!isChildObject && !this.isEntityQuery) {
                        throw NonEntityQuery_1.NON_ENTITY_SELECT_ERROR_MESSAGE;
                    }
                }
            }
        }
        return select;
    }
}
exports.MappableQuery = MappableQuery;
class TreeQuery extends MappableQuery {
    constructor(rawQuery, entityAliases = new Aliases_1.EntityAliases()) {
        super(entityAliases);
        this.rawQuery = rawQuery;
    }
    toJSON(queryUtils, fieldUtils) {
        let jsonMappedQuery = this.getNonEntityQuery(this.rawQuery, {}, (jsonQuery) => {
            jsonQuery.S = this.selectClauseToJSON(this.rawQuery.select, queryUtils, fieldUtils);
        }, queryUtils, fieldUtils);
        return jsonMappedQuery;
    }
}
exports.TreeQuery = TreeQuery;
//# sourceMappingURL=TreeQuery.js.map