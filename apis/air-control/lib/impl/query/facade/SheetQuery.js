"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../../core/field/Field");
const NonEntityQuery_1 = require("./NonEntityQuery");
/**
 * Created by Papa on 10/23/2016.
 */
class SheetQuery extends NonEntityQuery_1.DistinguishableQuery {
    constructor(rawQuery, utils) {
        super();
        this.rawQuery = rawQuery;
        this.utils = utils;
    }
    nonDistinctSelectClauseToJSON(rawSelect) {
        if (!(rawSelect instanceof Array)) {
            throw `Flat Queries an array of fields in SELECT clause.`;
        }
        return rawSelect.map((selectField) => {
            if (!(selectField instanceof Field_1.QField)) {
                throw NonEntityQuery_1.NON_ENTITY_SELECT_ERROR_MESSAGE;
            }
            this.columnAliases.entityAliases.getNextAlias(selectField.q.__driver__.getRootJoinEntity());
            return selectField.toJSON(this.columnAliases, true);
        });
    }
    toJSON() {
        let select = this.selectClauseToJSON(this.rawQuery.select);
        let jsonFieldQuery = {
            S: select
        };
        return this.getNonEntityQuery(this.rawQuery, jsonFieldQuery, null, this.utils.Query);
    }
}
exports.SheetQuery = SheetQuery;
//# sourceMappingURL=SheetQuery.js.map