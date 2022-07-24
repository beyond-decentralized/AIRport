/**
 * Created by Papa on 10/16/2016.
 */
export class FieldInOrderBy {
    constructor(field, sortOrder) {
        this.field = field;
        this.sortOrder = sortOrder;
    }
    toJSON(columnAliases) {
        if (!columnAliases.hasAliasFor(this.field)) {
            throw new Error(`Field used in ORDER_BY clause is not present in SELECT clause`);
        }
        return {
            fa: columnAliases.getExistingAlias(this.field),
            so: this.sortOrder
        };
    }
    toEntityJSON() {
        let qField = this.field;
        return {
            fa: undefined,
            ci: qField.dbColumn.index,
            pi: qField.dbProperty.index,
            ti: qField.dbProperty.entity.index,
            si: qField.dbProperty.entity.applicationVersion._localId,
            so: this.sortOrder
        };
    }
}
//# sourceMappingURL=FieldInOrderBy.js.map