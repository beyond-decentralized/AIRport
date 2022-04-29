import { FieldQuery } from '../query/facade/FieldQuery';
export class FieldUtils {
    getFieldQueryJson(fieldSubQuery, entityAliases, queryUtils) {
        let subSelectQuery = new FieldQuery(fieldSubQuery, entityAliases);
        return subSelectQuery.toJSON(queryUtils, this, this.relationManager);
    }
}
//# sourceMappingURL=FieldUtils.js.map