import { QField } from "../../core/field/Field";
import { DistinguishableQuery, NON_ENTITY_SELECT_ERROR_MESSAGE, } from "./NonEntityQuery";
/**
 * Created by Papa on 10/23/2016.
 */
export class SheetQuery extends DistinguishableQuery {
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
            if (!(selectField instanceof QField)) {
                throw NON_ENTITY_SELECT_ERROR_MESSAGE;
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
//# sourceMappingURL=SheetQuery.js.map