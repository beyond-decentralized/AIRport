"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../../core/field/Field");
const TreeQuery_1 = require("./TreeQuery");
/**
 * Created by Papa on 10/24/2016.
 */
class EntityQuery extends TreeQuery_1.MappableQuery {
    constructor(rawQuery) {
        super();
        this.rawQuery = rawQuery;
        this.isEntityQuery = true;
        this.isHierarchicalEntityQuery = true;
    }
    toJSON(queryUtils, fieldUtils) {
        return {
            S: this.selectClauseToJSON(this.rawQuery.select),
            F: this.fromClauseToJSON(this.rawQuery.from),
            W: queryUtils.whereClauseToJSON(this.rawQuery.where, this.columnAliases, fieldUtils),
            OB: this.orderByClauseToJSON(this.rawQuery.orderBy)
        };
    }
    nonDistinctSelectClauseToJSON(rawSelect) {
        for (let field in rawSelect) {
            let value = rawSelect[field];
            if (value instanceof Field_1.QField) {
                throw `Field References cannot be used in Entity Queries`;
            }
            else if (value instanceof Object && !(value instanceof Date)) {
                this.nonDistinctSelectClauseToJSON(value);
            }
        }
        return rawSelect;
    }
    orderByClauseToJSON(orderBy) {
        if (!orderBy || !orderBy.length) {
            return null;
        }
        return orderBy.map((field) => {
            return field.toEntityJSON();
        });
    }
}
exports.EntityQuery = EntityQuery;
class LimitedEntityQuery extends EntityQuery {
    constructor(rawQuery) {
        super(rawQuery);
        this.rawQuery = rawQuery;
        this.isHierarchicalEntityQuery = false;
    }
    toJSON(queryUtils, fieldUtils) {
        let limitedJsonEntity = super.toJSON(queryUtils, fieldUtils);
        limitedJsonEntity.L = this.rawQuery.limit;
        limitedJsonEntity.O = this.rawQuery.offset;
        return limitedJsonEntity;
    }
}
exports.LimitedEntityQuery = LimitedEntityQuery;
//# sourceMappingURL=EntityQuery.js.map