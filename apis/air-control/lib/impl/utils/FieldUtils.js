import { DI } from '@airport/di';
import { FIELD_UTILS } from '../../tokens';
import { FieldQuery } from '../query/facade/FieldQuery';
export class FieldUtils {
    getFieldQueryJson(fieldSubQuery, entityAliases, queryUtils) {
        let subSelectQuery = new FieldQuery(fieldSubQuery, entityAliases);
        return subSelectQuery.toJSON(queryUtils, this);
    }
}
DI.set(FIELD_UTILS, FieldUtils);
//# sourceMappingURL=FieldUtils.js.map