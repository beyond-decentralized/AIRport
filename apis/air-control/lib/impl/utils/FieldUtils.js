import { DI } from '@airport/di';
import { FIELD_UTILS } from '../../tokens';
export class FieldUtils {
    getFieldQueryJson(fieldSubQuery, entityAliases, queryUtils) {
        if (!this.FieldQuery) {
            this.FieldQuery = require('../query/facade/FieldQuery').FieldQuery;
        }
        let subSelectQuery = new this.FieldQuery(fieldSubQuery, entityAliases);
        return subSelectQuery.toJSON(queryUtils, this);
    }
}
DI.set(FIELD_UTILS, FieldUtils);
//# sourceMappingURL=FieldUtils.js.map