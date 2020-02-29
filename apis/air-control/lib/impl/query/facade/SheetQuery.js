import { QField } from '../../core/field/Field';
import { DistinguishableQuery, NON_ENTITY_SELECT_ERROR_MESSAGE, } from './NonEntityQuery';
/**
 * Created by Papa on 10/23/2016.
 */
export class SheetQuery extends DistinguishableQuery {
    constructor(rawQuery) {
        super();
        this.rawQuery = rawQuery;
    }
    nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils) {
        if (!(rawSelect instanceof Array)) {
            throw new Error(`Flat Queries an array of fields in SELECT clause.`);
        }
        return rawSelect.map((selectField) => {
            if (!(selectField instanceof QField)) {
                throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE);
            }
            this.columnAliases.entityAliases.getNextAlias(selectField.q.__driver__.getRootJoinEntity());
            return selectField.toJSON(this.columnAliases, true, queryUtils, fieldUtils);
        });
    }
    toJSON(queryUtils, fieldUtils) {
        let select = this.selectClauseToJSON(this.rawQuery.select, queryUtils, fieldUtils);
        let jsonFieldQuery = {
            S: select
        };
        return this.getNonEntityQuery(this.rawQuery, jsonFieldQuery, null, queryUtils, fieldUtils);
    }
}
//# sourceMappingURL=SheetQuery.js.map