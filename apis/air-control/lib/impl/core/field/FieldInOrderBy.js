"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 10/16/2016.
 */
class FieldInOrderBy {
    constructor(field, sortOrder) {
        this.field = field;
        this.sortOrder = sortOrder;
    }
    toJSON(columnAliases) {
        if (!columnAliases.hasAliasFor(this.field)) {
            throw `Field used in order by clause is not present in select clause`;
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
            si: qField.dbProperty.entity.schemaVersion.id,
            so: this.sortOrder
        };
    }
}
exports.FieldInOrderBy = FieldInOrderBy;
//# sourceMappingURL=FieldInOrderBy.js.map